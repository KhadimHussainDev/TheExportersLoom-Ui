import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../Themes/colors";

const { width, height } = Dimensions.get("window");

const SelectedModuleStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  moduleText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: height * 0.02,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: width * 0.06,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
  },
  backButtonText: {
    color: colors.background,
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default SelectedModuleStyles;
