import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

export const createProfileScreenStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: width * 0.04,
      backgroundColor: colors.background,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: height * 0.015,
    },
    editIcon: {
      position: "absolute",
      top: height * 0.01,
      right: width * 0.025,
    },
    statsSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: width * 0.05,
      marginBottom: height * 0.008,
      backgroundColor: colors.white,
      borderRadius: 8,
      padding: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    statItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    statValue: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: colors.primary,
    },
    statLabel: {
      fontSize: width * 0.028,
      color: colors.text,
      marginTop: 2,
    },
    statsText: {
      fontSize: width * 0.04,
      textAlign: "center",
    },
    verifications: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: height * 0.008,
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 6,
      height: height * 0.045,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    reviewText: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      marginBottom: height * 0.01,
      marginTop: height * 0.01,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#333',
    },
    reviewsLoadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      height: 150,
    },
    placeholderText: {
      color: colors.placeholderText,
      fontStyle: 'italic',
      fontSize: width * 0.035,
    },
    emptyStateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.lightBackground,
      borderRadius: 10,
      marginVertical: 10,
    },
    emptyStateText: {
      color: colors.placeholderText,
      fontSize: width * 0.04,
      textAlign: 'center',
      marginTop: 10,
    },
  });
