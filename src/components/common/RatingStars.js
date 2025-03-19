import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RatingStarsStyle from "../../Styles/Components/RatingStarsStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = RatingStarsStyle(width, height);

const RatingStars = ({ rating, showNumber = true, size = 14 }) => {
  // Handle decimal ratings
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Icon
            key={`full-${index}`}
            name="star"
            size={size}
            color="#FFD700"
            style={styles.star}
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <Icon
            key="half"
            name="star-half"
            size={size}
            color="#FFD700"
            style={styles.star}
          />
        )}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Icon
            key={`empty-${index}`}
            name="star-outline"
            size={size}
            color="#FFD700"
            style={styles.star}
          />
        ))}
      </View>

      {showNumber && (
        <Text style={styles.ratingText}>
          ({rating.toFixed(1)})
        </Text>
      )}
    </View>
  );
};

export default RatingStars;
