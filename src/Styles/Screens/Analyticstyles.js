import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const Analyticstyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: colors.background, // Updated background color
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.05,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      marginBottom: height * 0.02,
    },
    textRow: {
      width: "100%",
      marginBottom: height * 0.1,
      alignItems: "center",
    },
  });

export default Analyticstyles;
