import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../Themes/colors";

const { width, height } = Dimensions.get("window");

const CostEstimationBreakdownStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: width * 0.04,
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginVertical: height * 0.02,
    color: colors.primary,
  },
  listContent: {
    paddingBottom: height * 0.01,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
  },
  summaryText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: colors.Text,
  },
  summaryCost: {
    fontSize: width * 0.045,
    marginRight: width * 0.04,
  },
  buttonCalculateCost: {
    backgroundColor: colors.secondary,
    padding: height * 0.015,
    borderRadius: width * 0.04,
    borderColor: colors.border,
    borderWidth: 0.7,
    alignItems: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    marginRight: width * 0.04,
    marginLeft: width * 0.04,
  },
  buttonTextculateCost: {
    color: colors.Text,
    fontWeight: "bold",
    fontSize: height * 0.02,
  },
  buttonModulePosting: {
    backgroundColor: colors.primary,
    padding: height * 0.015,
    borderRadius: width * 0.04,
    alignItems: "center",
    marginBottom: height * 0.04,
    marginRight: width * 0.04,
    marginLeft: width * 0.04,
  },
  buttonTextModulePosting: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: height * 0.02,
  },
});

export default CostEstimationBreakdownStyles;
