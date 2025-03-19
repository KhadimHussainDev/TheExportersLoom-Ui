import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { IMAGES } from "../../utils/contants/images";
import RatingStars from "../common/RatingStars";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid date";
  }
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerProfile}>
          <Image
            source={review.reviewerPicture ? { uri: review.reviewerPicture } : IMAGES.Profile}
            style={styles.reviewerImage}
          />
          <View style={styles.reviewerInfo}>
            <Text style={styles.reviewerName}>{review.reviewerName || "Anonymous"}</Text>
            <Text style={styles.reviewDate}>{formatDate(review.reviewDate)}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <RatingStars rating={review.rating || 0} size={12} showNumber={false} />
          <Text style={styles.ratingText}>({review.rating || 0})</Text>
        </View>
      </View>

      <Text style={styles.commentText}>{review.reviewText || "No comment provided."}</Text>

      {review.jobType && (
        <View style={styles.jobTypeContainer}>
          <Icon name="briefcase-outline" size={14} color="#666" />
          <Text style={styles.jobTypeText}>{review.jobType}</Text>
        </View>
      )}
    </View>
  );
};

const UserReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No reviews yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item, index) => `review-${index}`}
      renderItem={({ item }) => <ReviewItem review={item} />}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  reviewerProfile: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 10,
  },
  jobTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobTypeText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
  },
  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
  },
});

export default UserReviewsList; 