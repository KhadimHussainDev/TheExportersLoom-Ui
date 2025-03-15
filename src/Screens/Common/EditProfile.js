import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { userService } from "../../services/userService";
import EditProfileStyles from "../../Styles/Screens/EditProfileStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { addDataUriPrefix, extractBase64FromDataUri, isBase64Image } from "../../utils/helpers/imageUtils";

const { width, height } = getWindowDimensions();
const styles = EditProfileStyles(width, height);

const EditProfile = ({
  isModalVisible,
  setIsModalVisible,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  username,
  setUsername,
  companyName,
  setCompanyName,
  cnic,
  setCnic,
  aboutMe,
  setAboutMe,
  onProfileUpdated,
  image,
  setImage,
}) => {
  const [localUsername, setLocalUsername] = useState(username);
  const [localCompanyName, setLocalCompanyName] = useState(companyName);
  const [localCnic, setLocalCnic] = useState(cnic);
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);
  const [localAddress, setLocalAddress] = useState(address);
  const [localAboutMe, setLocalAboutMe] = useState(aboutMe);
  const [localImage, setLocalImage] = useState(image);
  const [isLoading, setIsLoading] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);

  // Reset local state when modal becomes visible
  React.useEffect(() => {
    if (isModalVisible) {
      setLocalUsername(username || "");
      setLocalCompanyName(companyName || "");
      setLocalCnic(cnic || "");
      setLocalName(name || "");
      setLocalEmail(email || "");
      setLocalPhone(phone || "");
      setLocalAddress(address || "");
      setLocalAboutMe(aboutMe || "");
      setLocalImage(image);
    }
  }, [isModalVisible, username, companyName, cnic, name, email, phone, address, aboutMe, image]);

  // Convert image to base64 with reduced dimensions
  const processImage = async (uri) => {
    try {
      setProcessingImage(true);

      // Resize the image to reduce its dimensions
      const manipResult = await manipulateAsync(
        uri,
        [{ resize: { width: 200, height: 200 } }],
        { format: SaveFormat.JPEG, compress: 0.6 }
      );

      // Convert the resized image to base64
      const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setProcessingImage(false);
      return base64; // Return only the base64 string without the data URI prefix
    } catch (error) {
      console.error('Error processing image:', error);
      setProcessingImage(false);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to enable permissions to access the gallery."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        // Process the image (resize and convert to base64)
        const base64Image = await processImage(result.assets[0].uri);
        setLocalImage(base64Image);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an issue processing the image. Please try again."
      );
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Basic validation
      if (localEmail && !isValidEmail(localEmail)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Get current user ID
      const userId = await userService.getCurrentUserId();

      if (!userId) {
        Alert.alert('Error', 'Unable to identify user. Please log in again.');
        setIsLoading(false);
        return;
      }

      // Prepare profile data according to update-users.dto.ts format
      const profileData = {
        username: localUsername,
        email: localEmail,
        bio: localAboutMe,
        name: localName,
        company_name: localCompanyName,
        phone_number: localPhone,
        cnic: localCnic,
        address: localAddress,
      };

      // Add picture to profile data if it has changed
      if (localImage && localImage !== image) {
        // Make sure we're sending just the base64 string without the data URI prefix
        profileData.picture = extractBase64FromDataUri(localImage);
      }

      console.log('Updating profile with data:', {
        ...profileData,
        picture: profileData.picture ? 'base64_image_data' : null
      });

      // Update profile
      const response = await userService.updateUserProfile(userId, profileData);

      if (!response.success) {
        Alert.alert(
          "Update Failed",
          response.message || "Failed to update profile. Please try again."
        );
        setIsLoading(false);
        return;
      }

      // Update parent component state
      setUsername(localUsername);
      setCompanyName(localCompanyName);
      setCnic(localCnic);
      setName(localName);
      setEmail(localEmail);
      setPhone(localPhone);
      setAddress(localAddress);
      setAboutMe(localAboutMe);
      if (setImage && localImage !== image) {
        setImage(localImage);
      }

      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully!"
      );

      // Call the callback function if provided
      if (onProfileUpdated) {
        onProfileUpdated();
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalTitle}>Edit Your Information</Text>

        {/* Profile Image Picker */}
        <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
          <Image
            source={
              localImage
                ? isBase64Image(localImage)
                  ? { uri: addDataUriPrefix(localImage) }
                  : { uri: localImage }
                : require("../../assets/images/Profile.png")
            }
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={localUsername}
          onChangeText={setLocalUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={localCompanyName}
          onChangeText={setLocalCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="National ID Number"
          value={localCnic}
          onChangeText={setLocalCnic}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={localName}
          onChangeText={setLocalName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={localEmail}
          onChangeText={setLocalEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={localPhone}
          onChangeText={setLocalPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={localAddress}
          onChangeText={setLocalAddress}
        />
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="About Me"
          value={localAboutMe}
          onChangeText={setLocalAboutMe}
          multiline
        />
        <View style={styles.buttonRow}>
          {isLoading || processingImage ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              {processingImage && <Text style={styles.loadingText}>Processing image...</Text>}
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: "red" }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfile;
