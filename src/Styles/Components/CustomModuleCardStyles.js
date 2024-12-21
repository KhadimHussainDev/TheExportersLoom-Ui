import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../Themes/colors";

const { width, height } = Dimensions.get("window");

const CustomModuleCardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: colors.background,
    padding: width * 0.04,
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.05,
    borderRadius: width * 0.02,
    elevation: 4,
  },
  image: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: width * 0.02,
    marginRight: width * 0.04,
    backgroundColor: colors.PlaceholderText,
  },
  textContainer: {
    flex: 1,
  },
  leadingText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: colors.Text,
  },
  trailingText: {
    fontSize: width * 0.035,
    color: colors.forgotPasswordText,
  },
});

export default CustomModuleCardStyles;
