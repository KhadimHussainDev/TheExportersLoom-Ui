import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const SearchNewManufacturerCardStyles = (width, height) => {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.AdditonalDetailstextbox,
      borderRadius: 10,
      padding: width * 0.04, // Dynamically adjust padding based on width
      margin: width * 0.02, // Dynamically adjust margin based on width
      elevation: 3,
      position: "relative",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: height * 0.01, // Adjust spacing based on height
    },
    profile: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileImage: {
      width: width * 0.12, // Dynamic width for profile image
      height: width * 0.12, // Dynamic height for profile image
      borderRadius: (width * 0.12) / 2, // Ensure circular image
      marginRight: width * 0.03,
    },
    profileDetails: {
      flexDirection: "column",
    },
    name: {
      fontWeight: "bold",
      fontSize: width * 0.04, // Dynamic font size
      color: colors.Text, // Updated text color
    },
    location: {
      fontSize: width * 0.03,
      color: colors.PlaceholderText, // Updated text color
    },
    level: {
      fontSize: width * 0.035,
      color: colors.Text, // Updated text color
    },
    description: {
      fontSize: width * 0.035,
      color: colors.Text, // Updated text color
      marginBottom: height * 0.01,
    },
    chatIconContainer: {
      position: "absolute",
      bottom: height * 0.02,
      right: width * 0.04,
      backgroundColor: colors.primary,
      borderRadius: 50,
      padding: width * 0.02,
      justifyContent: "center",
      alignItems: "center",
    },
    labelsContainer: {
      marginVertical: height * 0.015,
    },
    labelsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    label: {
      backgroundColor: colors.GoogleButtonBorder, // Light blue background for labels
      paddingVertical: height * 0.006,
      paddingHorizontal: width * 0.025,
      borderRadius: 20,
      marginBottom: height * 0.01,
      marginRight: width * 0.02,
      fontSize: width * 0.03,
      color: colors.Text, // Updated text color
    },
  });
};

export default SearchNewManufacturerCardStyles;
