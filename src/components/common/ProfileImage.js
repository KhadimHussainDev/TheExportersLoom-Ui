import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { createProfileImageStyles } from "../../Styles/Components/ProfileImageStyles";
import { addDataUriPrefix, isBase64Image } from "../../utils/helpers/imageUtils";

const ProfileImage = ({ image, setImage, width, height }) => {
  const styles = createProfileImageStyles(width, height);

  useEffect(() => {
    const getPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to enable permissions to access the gallery."
        );
      }
    };

    getPermission();
  }, []);

  // Convert image to base64 with reduced dimensions
  const processImage = async (uri) => {
    try {
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

      return base64; // Return only the base64 string without the data URI prefix
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        // Process the image (resize and convert to base64)
        const base64Image = await processImage(result.assets[0].uri);
        setImage(base64Image);
      } else {
        // console.log("Image pick canceled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an issue processing the image. Please try again."
      );
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        source={
          image
            ? isBase64Image(image)
              ? { uri: addDataUriPrefix(image) }
              : { uri: image }
            : require("../../assets/images/Profile.png")
        }
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
};

export default ProfileImage;
