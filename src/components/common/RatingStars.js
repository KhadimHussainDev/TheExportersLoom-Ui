import React from "react";
import { View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RatingStarsStyle from "../../Styles/Components/RatingStarsStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = RatingStarsStyle(width, height);

const RatingStars = ({ rating }) => (
  <View style={styles.rating}>
    {[...Array(5)].map((_, index) => (
      <Icon
        key={index}
        name="star"
        size={14}
        color={index < rating ? "gold" : "#ccc"}
      />
    ))}
  </View>
);

export default RatingStars;
