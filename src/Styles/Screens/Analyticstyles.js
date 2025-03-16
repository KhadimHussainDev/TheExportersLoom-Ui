import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const Analyticstyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, // Updated background color
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.05,
    },
    content: {
      flex: 1,
      justifyContent: "flex-start",
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
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: height * 0.02,
      fontSize: width * 0.04,
      color: colors.primary,
    },
    errorText: {
      color: 'red',
      fontSize: width * 0.04,
      textAlign: 'center',
    },
  });

export default Analyticstyles;
