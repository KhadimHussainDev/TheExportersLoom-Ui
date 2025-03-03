import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const OrderCardStyles = (width, height) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: colors.AdditonalDetailstextbox, // Updated background color
      borderRadius: 10,
      marginBottom: height * 0.02, // Adjusted margin based on height
      overflow: "hidden",
      shadowColor: colors.Text, // Updated shadow color
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      height: height * 0.17, // Adjusted height for the card
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: width * 0.04, // Adjusted padding based on width
      paddingTop: height * 0.01,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    orderName: {
      fontSize: width * 0.04, // Adjusted font size based on width
      color: colors.primary, // Updated text color
      fontWeight: "bold",
    },
    iconsLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    chatIcon: {
      position: "relative",
      marginRight: width * 0.03, // Adjusted margin based on width
    },
    badge: {
      position: "absolute",
      top: -height * 0.007, // Adjusted based on height
      right: -width * 0.02, // Adjusted based on width
      backgroundColor: colors.error,
      width: width * 0.04, // Adjusted size based on width
      height: width * 0.04, // Adjusted size based on width
      borderRadius: (width * 0.04) / 2, // Circular badge
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: colors.whiteborder, // Updated text color
      fontSize: width * 0.025, // Adjusted font size based on width
      fontWeight: "bold",
    },
    details: {
      marginTop: height * 0.001, // Adjusted based on height
    },
    detailText: {
      fontSize: width * 0.03, // Adjusted font size based on width
      color: colors.Text, // Updated text color
    },
    progressContainer: {
      marginTop: height * 0.01, // Adjusted based on height
      alignItems: "flex-start",
    },
    progressText: {
      fontSize: width * 0.03, // Adjusted font size based on width
      color: colors.PlaceholderText, // Updated text color
      marginBottom: height * 0.005, // Adjusted margin based on height
    },
    progressBarContainer: {
      flexDirection: "row",
      height: height * 0.01, // Adjusted height based on height
      backgroundColor: colors.AdditonalDetailstextbox, // Updated background color
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
      marginTop: height * 0.01, // Adjusted based on height
    },
    daysLeft: {
      fontSize: width * 0.035, // Adjusted font size based on width
      color: colors.error, // Updated text color
      fontWeight: "bold",
    },
    rightBar: {
      width: width * 0.08, // Adjusted width based on width
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    arrowIcon: {
      alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: height * 0.005, // Adjusted margin based on height
    },
  });

export default OrderCardStyles;
