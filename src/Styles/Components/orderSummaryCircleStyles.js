import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const orderSummaryCircleStyles = (width, height) =>
  StyleSheet.create({
    circleContainer: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    circleText: {
      position: "absolute",
      fontSize: 24,
      fontWeight: "bold",
      color: colors.Text, // Updated text color
    },
    circleSubtitle: {
      position: "absolute",
      top: height * 0.1, // Adjusted based on height
      fontSize: width * 0.025, // Dynamic font size based on width
      color: colors.PlaceholderText, // Updated text color
    },
  });

export default orderSummaryCircleStyles;
