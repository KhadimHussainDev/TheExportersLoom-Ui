import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import RatingStars from "./RatingStars";
import ReviewsListStyle from "../../Styles/Components/ReviewsListStyle";
import { reviews } from "../../utils/Data/ReviewsData";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = ReviewsListStyle(width, height);

const ReviewsList = () => {
  return (
    <ScrollView style={styles.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={require("../../assets/images/Profile.png")}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{review.name}</Text>
            <Text style={styles.projectName}>{review.projectName}</Text>
            <Text style={styles.comment}>{review.comment}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <RatingStars rating={review.rating} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ReviewsList;
