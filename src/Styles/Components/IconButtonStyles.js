import { StyleSheet } from "react-native";

export const createIconButtonStyles = (width, height) =>
  StyleSheet.create({
    iconButton: {
      padding: width * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.08,
      height: width * 0.08,
      borderRadius: width * 0.04,
    },
  });
