import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerCarousel = ({ labelText, buttonText, onImageSelected }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to pick images
  const pickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        base64: true, // Get base64 string representation
      });

      if (!result.canceled && result.assets.length > 0) {
        const newImages = result.assets.map((img) => img.uri);
        setSelectedImages([...selectedImages, ...newImages]);
        
        // For backend integration, we'll use the first image
        // In a real app, you might want to handle multiple images differently
        const firstImage = result.assets[0];
        
        // If we have a callback function, pass the first image as a base64 string
        if (onImageSelected && firstImage) {
          // For simplicity, we're just passing the URI
          // In a real app, you'd typically convert this to base64 or upload to cloud storage
          onImageSelected(firstImage.uri);
        }
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  return (
    <View>
      <Text style={styles.label}>{labelText}</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {/* Display Selected Images in Carousel */}
      {selectedImages.length > 0 && (
        <FlatList
          horizontal
          data={selectedImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          style={styles.imageCarousel}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013240",
    marginBottom: 8,
  },
  uploadButton: {
    backgroundColor: "#013240",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageCarousel: {
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ImagePickerCarousel;
