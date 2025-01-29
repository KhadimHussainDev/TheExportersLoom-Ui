// styles/components/RatingStarsStyle.js
import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const RatingStarsStyle = (width, height) =>
  StyleSheet.create({
    rating: {
      flexDirection: "row",
      marginBottom: height * 0.012,
    },
  });

export default RatingStarsStyle;
