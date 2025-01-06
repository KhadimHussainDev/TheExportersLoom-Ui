import { StyleSheet } from "react-native";
import { colors } from "../../Themes/colors";

const ManufacturerSelectionStyle = (width, height) =>
  StyleSheet.create({
    list: {
      paddingHorizontal: width * 0.035,
      paddingBottom: height * 0.025,
      backgroundColor: colors.background,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: height * 0.024,
      paddingBottom: height * 0.024,
      backgroundColor: colors.background,
    },
  });

export default ManufacturerSelectionStyle;
