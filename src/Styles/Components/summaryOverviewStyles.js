import { StyleSheet } from "react-native";

const summaryOverviewStyles = (width, height) =>
  StyleSheet.create({
    summaryOverview: {
      marginLeft: 16,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    colorBox: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 8,
    },
    legendText: {
      fontSize: 14,
      color: "#333",
    },
  });

export default summaryOverviewStyles;
