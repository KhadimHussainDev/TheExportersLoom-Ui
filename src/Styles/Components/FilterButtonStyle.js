import { colors } from "../Themes/colors"; // Adjust the path as necessary

export const FilterButtonStyle = (width, height) => ({
  button: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    marginHorizontal: width * 0.02,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  defaultButton: {
    backgroundColor: colors.background, // Updated color
  },
  activeButton: {
    backgroundColor: colors.secondary, // Updated color
  },
  buttonText: {
    color: colors.Text, // Updatetd color
    fontWeight: "bold",
    textAlign: "center",
  },
});
