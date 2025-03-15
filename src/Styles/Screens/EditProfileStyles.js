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
    imagePickerContainer: {
      alignSelf: 'center',
      marginBottom: 20,
      position: 'relative',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    editIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.whiteborder,
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
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginTop: 10,
      color: colors.primary,
      fontSize: 14,
    },
  });
};

export default EditProfileStyles;
