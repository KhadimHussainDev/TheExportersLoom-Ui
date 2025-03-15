import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import ReviewsListStyle from "../../Styles/Components/ReviewsListStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";
import RatingStars from "./RatingStars";

const { width, height } = getWindowDimensions();
const styles = ReviewsListStyle(width, height);

const ReviewsList = ({ reviews = [] }) => {
  // Check if there are any reviews
  const hasReviews = reviews && reviews.length > 0;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!hasReviews) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No reviews yet</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={
              review.reviewGiver?.picture
                ? { uri: review.reviewGiver.picture }
                : require("../../assets/images/Profile.png")
            }
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>
              {review.reviewGiver?.name || "Anonymous"}
            </Text>
            <Text style={styles.projectName}>
              {review.orderId ? `Order #${review.orderId}` : ""}
            </Text>
            <Text style={styles.date}>
              {formatDate(review.reviewDate)}
            </Text>
            <Text style={styles.comment}>
              {review.reviewText || "No comment provided"}
            </Text>
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
