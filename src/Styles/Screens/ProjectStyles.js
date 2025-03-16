import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const ProjectStyles = (width, height) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.05,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.white,
    },
    backButton: {
      padding: width * 0.02,
    },
    title: {
      fontSize: width * 0.055,
      fontWeight: "bold",
      marginLeft: width * 0.03,
      color: colors.primary,
    },
    scrollView: {
      flex: 1,
      padding: width * 0.04,
    },
    projectInfoContainer: {
      backgroundColor: colors.white,
      borderRadius: width * 0.03,
      padding: width * 0.04,
      marginBottom: height * 0.02,
      shadowColor: colors.Text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    projectName: {
      fontSize: width * 0.055,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: height * 0.01,
    },
    projectDetailsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: height * 0.01,
    },
    detailItem: {
      flex: 1,
    },
    detailLabel: {
      fontSize: width * 0.035,
      color: colors.PlaceholderText,
      marginBottom: height * 0.005,
    },
    detailValue: {
      fontSize: width * 0.04,
      fontWeight: "600",
      color: colors.Text,
    },
    sectionTitle: {
      fontSize: width * 0.05,
      fontWeight: "bold",
      marginVertical: height * 0.02,
      color: colors.primary,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: height * 0.05,
      backgroundColor: colors.lightBackground,
      borderRadius: width * 0.03,
    },
    emptyText: {
      fontSize: width * 0.04,
      color: colors.PlaceholderText,
      textAlign: "center",
    },
    errorContainer: {
      padding: width * 0.04,
      backgroundColor: "#FFEBEE",
      borderRadius: width * 0.02,
      marginVertical: height * 0.01,
    },
    errorText: {
      fontSize: width * 0.035,
      color: "#D32F2F",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: height * 0.02,
      fontSize: width * 0.04,
      color: colors.Text,
    }
  });
};

export default ProjectStyles; 