import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IMAGES } from "../../utils/contants/images";

const UserProfileImage = ({ image, width, height }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : IMAGES.Profile}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default UserProfileImage; 