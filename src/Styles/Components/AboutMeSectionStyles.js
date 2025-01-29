import { StyleSheet } from "react-native";

export const createAboutMeSectionStyles = (width, height) =>
  StyleSheet.create({
    aboutMeSection: {
      marginTop: height * 0.02,
    },
    aboutMeTitle: {
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    aboutMeText: {
      fontSize: width * 0.035,
      color: "#333",
    },
  });
