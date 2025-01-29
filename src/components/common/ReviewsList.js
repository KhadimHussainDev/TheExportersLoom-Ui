import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import RatingStars from "./RatingStars";
const reviews = [
  {
    name: "User 1",
    projectName: "Project Alpha",
    comment:
      "Amazing work, highly recommended! What are you ding now a days you do not even tell me what is happening",
    rating: 5,
  },
  {
    name: "User 2",
    projectName: "Project Beta",
    comment: "Good quality and delivered on time.",
    rating: 4,
  },
  {
    name: "User 3",
    projectName: "Project Gamma",
    comment: "Satisfactory results, but room for improvement.",
    rating: 3,
  },
  {
    name: "User 4",
    projectName: "Project Delta",
    comment: "Excellent attention to detail.",
    rating: 5,
  },
  {
    name: "User 5",
    projectName: "Project Epsilon",
    comment: "Decent work, met expectations.",
    rating: 4,
  },
  {
    name: "User 6",
    projectName: "Project Zeta",
    comment: "Not satisfied with the results.",
    rating: 2,
  },
  {
    name: "User 7",
    projectName: "Project Eta",
    comment: "Great experience, would hire again.",
    rating: 5,
  },
  {
    name: "User 8",
    projectName: "Project Theta",
    comment: "Good work, but a bit delayed.",
    rating: 3,
  },
  {
    name: "User 9",
    projectName: "Project Iota",
    comment: "Fantastic job, exceeded expectations!",
    rating: 5,
  },
  {
    name: "User 10",
    projectName: "Project Kappa",
    comment: "Average work, nothing extraordinary.",
    rating: 3,
  },
];
const ReviewsList = () => {
  return (
    <ScrollView style={styleReviews.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styleReviews.card}>
          <Image
            source={require("../../assets/images/Profile.png")}
            style={styleReviews.profileImage}
          />
          <View style={styleReviews.textContainer}>
            <Text style={styleReviews.userName}>{review.name}</Text>
            <Text style={styleReviews.projectName}>{review.projectName}</Text>
            <Text style={styleReviews.comment}>{review.comment}</Text>
          </View>
          <View style={styleReviews.ratingContainer}>
            <RatingStars rating={review.rating} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styleReviews = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  projectName: {
    color: "#555",
    marginVertical: 2,
    fontSize: 14,
  },
  comment: {
    color: "#777",
    marginVertical: 2,
    fontSize: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default ReviewsList;
