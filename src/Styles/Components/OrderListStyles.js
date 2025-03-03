import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const OrderListStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, // Updated background color
      paddingVertical: height * 0.01, // Adjusted based on height
      //  paddingHorizontal: width * 0.05, // Adjusted based on width
    },
  });

export default OrderListStyles;
