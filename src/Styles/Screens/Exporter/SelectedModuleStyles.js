import { StyleSheet } from "react-native";
import { colors } from "../../Themes/colors";

const SelectedModuleStyles = (width, height) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5"
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: height * 0.05,
      paddingBottom: height * 0.02,
      paddingHorizontal: width * 0.05,
      flexDirection: "row",
      alignItems: "center"
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center"
    },
    backText: {
      color: "#fff",
      marginLeft: 8,
      fontSize: 16
    },
    headerTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: width * 0.05
    },
    scrollView: {
      flex: 1
    },
    moduleInfoContainer: {
      padding: width * 0.05
    },
    moduleTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 5
    },
    projectName: {
      fontSize: 16,
      color: "#666",
      marginBottom: 20
    },
    moduleDetailsCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 10
    },
    detailText: {
      fontSize: 14,
      color: "#333",
      marginBottom: 8
    },
    bidFormContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4
    },
    infoText: {
      fontSize: 14,
      color: "#666",
      marginBottom: 15,
      lineHeight: 20
    },
    descriptionText: {
      fontSize: 14,
      color: "#333",
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#eee"
    },
    priceText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 20
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 5,
      padding: 15,
      alignItems: "center",
      marginTop: 10
    },
    submitButtonText: {
      color: "#fff",
      fontSize: width * 0.04,
      fontWeight: "bold",
    },
    alreadyPostedContainer: {
      backgroundColor: "#f0f0f0",
      padding: width * 0.04,
      borderRadius: 8,
      marginTop: width * 0.04,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    alreadyPostedText: {
      fontSize: width * 0.04,
      color: "#666",
      fontWeight: "500",
    },
  });
};

export default SelectedModuleStyles;
