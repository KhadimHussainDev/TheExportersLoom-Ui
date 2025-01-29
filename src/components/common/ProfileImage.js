import React, { useEffect } from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createProfileImageStyles } from "../../Styles/Components/ProfileImageStyles";

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

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri); // Updated to use result.assets[0].uri
      } else {
        console.log("Image pick canceled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "There was an issue picking the image. Please try again."
      );
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        source={
          image ? { uri: image } : require("../../assets/images/Profile.png")
        }
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
};

export default ProfileImage;
