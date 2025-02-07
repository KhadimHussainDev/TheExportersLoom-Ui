import { colors } from "../Themes/colors"; // Adjust the path as necessary

export const FilterButtonStyle = (width, height) => ({
  button: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    marginHorizontal: width * 0.02,
  },
  defaultButton: {
    backgroundColor: colors.PlaceholderText, // Updated color
  },
  activeButton: {
    backgroundColor: colors.info, // Updated color
  },
  buttonText: {
    color: colors.whiteborder, // Updated color
    fontWeight: "bold",
    textAlign: "center",
  },
});
