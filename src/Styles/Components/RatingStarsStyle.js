// styles/components/RatingStarsStyle.js
import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const RatingStarsStyle = (width, height) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    star: {
      marginRight: width * 0.005,
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    ratingText: {
      fontSize: height * 0.016,
      color: colors.Text,
      marginLeft: width * 0.01,
      fontWeight: '500',
    },
  });

export default RatingStarsStyle;
