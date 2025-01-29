export const FilterButtonStyle = (width, height) => ({
  button: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    marginHorizontal: width * 0.02,
  },
  defaultButton: {
    backgroundColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
