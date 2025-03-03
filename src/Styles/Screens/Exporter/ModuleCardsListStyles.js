import { StyleSheet } from "react-native";
import { colors } from "../../Themes/colors";

const ModuleCardsListStyles = (width, height) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.primary, // Background color for the top section
    },
    headerContainer: {
      padding: width * 0.05, // Use width for dynamic padding
      paddingTop: height * 0.08, // Use height for extra space at the top (status bar)
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
  });
};

export default ModuleCardsListStyles;
