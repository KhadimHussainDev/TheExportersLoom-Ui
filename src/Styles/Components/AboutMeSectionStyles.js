import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

export const createAboutMeSectionStyles = (width, height) =>
  StyleSheet.create({
    aboutMeSection: {
      marginTop: height * 0.001,
    },
    aboutMeTitle: {
      fontSize: width * 0.045, // Dynamic font size based on width
      fontWeight: "bold",
      color: colors.Text, // Updated text color
    },
    aboutMeText: {
      fontSize: width * 0.035, // Dynamic font size based on width
      color: colors.Text, // Updated text color
    },
  });
