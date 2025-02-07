import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

export const createProfileImageStyles = (width, height) =>
  StyleSheet.create({
    profileImage: {
      width: width * 0.25,
      height: width * 0.25,
      borderRadius: (width * 0.25) / 2,
      marginRight: width * 0.05,
      borderWidth: 2,
      borderColor: colors.Text, // Updated border color
    },
  });
