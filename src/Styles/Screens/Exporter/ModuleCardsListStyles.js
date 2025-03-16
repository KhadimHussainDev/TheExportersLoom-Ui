import { StyleSheet } from "react-native";
import { colors } from "../../Themes/colors";

const ModuleCardsListStyles = (width, height) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.primary, // Background color for the top section
    },
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.05,
      paddingBottom: height * 0.01,
    },
    backButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backText: {
      color: colors.whiteborder,
      fontSize: width * 0.04,
      marginLeft: width * 0.02,
    },
    headerContainer: {
      padding: width * 0.05, // Use width for dynamic padding
      backgroundColor: colors.primary,
    },
    greeting: {
      fontSize: width * 0.04, // Dynamic font size based on width
      color: colors.whiteborder,
      fontWeight: "300",
    },
    projectTitle: {
      fontSize: width * 0.06, // Dynamic font size based on width
      color: colors.whiteborder,
      fontWeight: "700",
      marginVertical: width * 0.02, // Dynamic margin based on width
    },
    projectCost: {
      fontSize: width * 0.04, // Dynamic font size based on width
      color: colors.whiteborder,
      fontWeight: "500",
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: height * 0.01,
    },
    statusLabel: {
      fontSize: width * 0.04,
      color: colors.whiteborder,
      fontWeight: "500",
    },
    statusValue: {
      fontSize: width * 0.04,
      fontWeight: "700",
    },
    contentContainer: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopLeftRadius: width * 0.05, // Border radius as a percentage of width
      borderTopRightRadius: width * 0.05, // Border radius as a percentage of width
      padding: width * 0.03, // Dynamic padding based on width
    },
    scrollContent: {
      paddingBottom: height * 0.05, // Dynamic padding for bottom space based on height
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: width * 0.05,
    },
    loadingText: {
      fontSize: width * 0.04,
      color: colors.primary,
      marginTop: height * 0.02,
      textAlign: 'center',
    },
    errorText: {
      fontSize: width * 0.045,
      color: colors.error,
      textAlign: 'center',
      marginBottom: height * 0.02,
    },
    emptyText: {
      fontSize: width * 0.04,
      color: colors.Text,
      textAlign: 'center',
    },
    backButton: {
      marginTop: height * 0.02,
      padding: width * 0.03,
      backgroundColor: colors.primary,
      borderRadius: width * 0.02,
    },
    backButtonText: {
      color: colors.whiteborder,
      fontSize: width * 0.04,
      fontWeight: '500',
    }
  });
};

export default ModuleCardsListStyles;
