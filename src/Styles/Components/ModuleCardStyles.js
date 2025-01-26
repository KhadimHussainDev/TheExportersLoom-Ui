import { StyleSheet } from "react-native";

// Function to generate styles dynamically based on screen width and height
const ModuleCardStyles = (width, height) => {
  return StyleSheet.create({
    cardContainer: {
      borderRadius: width * 0.03, // Use width for calculation
      padding: width * 0.04, // Dynamic padding based on width
      marginVertical: height * 0.02, // Margin proportional to height
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: "#BFDCE5",
      maxWidth: width * 0.99, // 90% of the screen width
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: height * 0.01,
    },
    iconAndModule: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: width * 0.08,
      height: width * 0.08,
      borderRadius: width * 0.04,
      marginRight: width * 0.03,
    },
    leadingText: {
      fontSize: width * 0.04,
      fontWeight: "bold",
      color: "#013240",
    },
    middleText: {
      fontSize: width * 0.035,
      fontWeight: "600",
      color: "#333333",
      marginBottom: height * 0.005,
    },
    status: {
      fontSize: width * 0.03,
      color: "#76AAB5",
      marginBottom: height * 0.01,
    },
    body: {
      marginTop: height * 0.02,
    },
    description: {
      fontSize: width * 0.035,
      color: "#666",
      marginBottom: height * 0.02,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: height * 0.02,
    },
    cost: {
      fontSize: width * 0.035,
      fontWeight: "600",
      color: "#333",
    },
    assigned: {
      fontSize: width * 0.035,
      fontWeight: "600",
      color: "#333",
    },
  });
};

export default ModuleCardStyles;
