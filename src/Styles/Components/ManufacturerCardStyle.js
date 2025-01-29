// styles/components/ManufacturerCardStyle.js
import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const ManufacturerCardStyle = (width, height) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      padding: height * 0.01,
      marginBottom: height * 0.025,
      backgroundColor: colors.background,
      borderRadius: height * 0.018,
      elevation: 3,
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    profileImage: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: width * 0.05,
      marginRight: width * 0.025,
    },
    name: {
      fontSize: height * 0.02,
      fontWeight: "bold",
      marginBottom: height * 0.005,
      color: colors.Text,
    },
    priceDistanceSection: {
      alignItems: "flex-end",
      marginHorizontal: width * 0.025,
    },
    price: {
      fontSize: height * 0.02,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: height * 0.012,
    },
    distance: {
      fontSize: height * 0.018,
      color: colors.Text,
    },
    chatSection: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: width * 0.035,
    },
    chatButton: {
      backgroundColor: colors.primary,
      borderRadius: height * 0.01,
      padding: height * 0.014,
    },
    days: {
      marginTop: height * 0.012,
      fontSize: height * 0.015,
      color: colors.Text,
    },
  });

export default ManufacturerCardStyle;
