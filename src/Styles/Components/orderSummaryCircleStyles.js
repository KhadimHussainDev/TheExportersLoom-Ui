import { StyleSheet } from "react-native";

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
      color: "#000",
    },
    circleSubtitle: {
      position: "absolute",
      top: 70,
      fontSize: 10,
      color: "#888",
    },
  });

export default orderSummaryCircleStyles;
