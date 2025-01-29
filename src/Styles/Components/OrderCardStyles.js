import { StyleSheet } from "react-native";

const OrderCardStyles = (width, height) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: "#e6f7ff",
      borderRadius: 10,
      marginBottom: 15,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      height: 140, // Reduced height for the card
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    orderName: {
      fontSize: 16,
      color: "#004d66",
      fontWeight: "bold",
    },
    iconsLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    chatIcon: {
      position: "relative",
      marginRight: 10,
    },
    badge: {
      position: "absolute",
      top: -5,
      right: -8,
      backgroundColor: "red",
      width: 16,
      height: 16,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "white",
      fontSize: 10,
      fontWeight: "bold",
    },
    details: {
      marginTop: 1,
    },
    detailText: {
      fontSize: 12,
      color: "#333",
    },
    progressContainer: {
      marginTop: 10,
      alignItems: "flex-start",
    },
    progressText: {
      fontSize: 12,
      color: "#666",
      marginBottom: 5,
    },
    progressBarContainer: {
      flexDirection: "row",
      height: 8,
      backgroundColor: "#e0e0e0",
      borderRadius: 4,
      overflow: "hidden",
      width: "80%",
    },
    progressBar: {
      height: "100%",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 10,
    },
    daysLeft: {
      fontSize: 14,
      color: "red",
      fontWeight: "bold",
    },
    rightBar: {
      width: 30,
      backgroundColor: "#013240",
      justifyContent: "center",
      alignItems: "center",
    },
    arrowIcon: {
      alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
    },
  });

export default OrderCardStyles;
