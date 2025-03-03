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

const ImagePickerCarousel = ({ labelText, buttonText }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to pick images
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([
        ...selectedImages,
        ...result.assets.map((img) => img.uri),
      ]);
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
