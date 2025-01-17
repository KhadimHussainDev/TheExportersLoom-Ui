import { StyleSheet } from "react-native";

const ReviewsListStyle = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: height * 0.01, // Adjust based on height
      backgroundColor: "#f5f5f5",
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: height * 0.015, // Adjust padding based on height
      marginVertical: height * 0.005, // Adjust margin based on height
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    profileImage: {
      width: width * 0.13, // Adjust image size based on width
      height: width * 0.13, // Maintain square ratio
      borderRadius: (width * 0.13) / 2, // Circular image
      marginRight: width * 0.03, // Adjust margin based on width
    },
    textContainer: {
      flex: 1,
    },
    userName: {
      fontWeight: "bold",
      fontSize: width * 0.045, // Adjust font size based on width
    },
    projectName: {
      color: "#555",
      marginVertical: height * 0.003, // Adjust margin based on height
      fontSize: width * 0.04, // Adjust font size based on width
    },
    comment: {
      color: "#777",
      marginVertical: height * 0.003, // Adjust margin based on height
      fontSize: width * 0.035, // Adjust font size based on width
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  });

export default ReviewsListStyle;
