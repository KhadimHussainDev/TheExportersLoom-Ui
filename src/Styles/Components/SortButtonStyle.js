// styles/components/SortButtonStyle.js
import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const SortButtonStyle = (width, height) =>
  StyleSheet.create({
    sortButton: {
      padding: height * 0.01,
      paddingHorizontal: width * 0.04,
      borderRadius: width * 0.04,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.secondary,
    },
    buttonText: {
      fontSize: height * 0.018,
      fontWeight: "bold",
      color: colors.Text,
    },
  });

export default SortButtonStyle;
