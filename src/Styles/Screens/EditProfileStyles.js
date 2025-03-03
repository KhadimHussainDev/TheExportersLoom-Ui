import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const EditProfileStyles = (width, height) => {
  return StyleSheet.create({
    modalContent: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: colors.background, // Added background color
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.primary, // Updated color
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border, // Updated border color
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      width: width * 0.9,
      color: colors.Text, // Updated text color
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    eyeIcon: {
      position: "absolute",
      right: 10,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    saveButton: {
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: colors.primary, // Updated background color
      paddingVertical: height * 0.015,
      borderRadius: 20,
      alignItems: "center",
    },
    buttonText: {
      color: colors.whiteborder, // Updated text color
      fontWeight: "bold",
    },
  });
};

export default EditProfileStyles;
