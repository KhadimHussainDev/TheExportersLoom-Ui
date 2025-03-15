import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

export const createAboutMeSectionStyles = (width, height) =>
  StyleSheet.create({
    aboutMeSection: {
      marginTop: height * 0.008,
      backgroundColor: colors.white,
      borderRadius: 8,
      padding: 10,
      marginBottom: height * 0.01,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    aboutMeTitle: {
      fontSize: width * 0.04, // Slightly reduced font size
      fontWeight: "bold",
      color: colors.Text, // Updated text color
      marginBottom: 6, // Reduced margin
    },
    aboutMeText: {
      fontSize: width * 0.035, // Dynamic font size based on width
      color: colors.Text, // Updated text color
      lineHeight: width * 0.045, // Reduced line height
    },
    emptyStateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10, // Reduced padding
      backgroundColor: colors.lightBackground || '#f5f5f5',
      borderRadius: 6, // Reduced border radius
      marginTop: 6, // Reduced margin
    },
    placeholderText: {
      color: colors.placeholderText || '#999',
      fontStyle: 'italic',
      fontSize: width * 0.033, // Slightly reduced font size
      textAlign: 'center',
      marginTop: 6, // Reduced margin
    },
  });
