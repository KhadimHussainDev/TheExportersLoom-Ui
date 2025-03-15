import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const ReviewsListStyle = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      paddingBottom: 10,
    },
    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      paddingRight: 30, // Make room for the rating
    },
    userName: {
      fontWeight: "bold",
      fontSize: 14,
      marginBottom: 2,
    },
    projectName: {
      color: "#666",
      fontSize: 12,
      marginBottom: 1,
    },
    date: {
      color: "#888",
      fontSize: 10,
      marginBottom: 3,
      fontStyle: "italic",
    },
    comment: {
      fontSize: 12,
      color: "#333",
      marginTop: 2,
      lineHeight: 16,
    },
    ratingContainer: {
      position: "absolute",
      top: 10,
      right: 10,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      height: 100,
      backgroundColor: colors.lightBackground || "#f5f5f5",
      borderRadius: 8,
    },
    emptyText: {
      fontSize: 14,
      color: "#888",
      fontStyle: "italic",
    },
  });

export default ReviewsListStyle;
