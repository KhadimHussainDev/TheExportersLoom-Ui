import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const summaryOverviewStyles = (width, height) =>
  StyleSheet.create({
    summaryOverview: {
      marginLeft: width * 0.04, // Dynamic margin based on width
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: height * 0.01, // Dynamic margin based on height
    },
    colorBox: {
      width: width * 0.04, // Dynamic width based on width
      height: width * 0.04, // Dynamic height based on width
      borderRadius: (width * 0.04) / 2, // Dynamic border radius based on width
      marginRight: width * 0.02, // Dynamic margin based on width
    },
    legendText: {
      fontSize: width * 0.035, // Dynamic font size based on width
      color: colors.Text,
    },
  });

export default summaryOverviewStyles;
