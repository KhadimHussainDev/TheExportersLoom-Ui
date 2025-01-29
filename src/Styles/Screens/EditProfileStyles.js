import { StyleSheet } from "react-native";

const EditProfileStyles = (width, height) => {
  return StyleSheet.create({
    modalContent: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      width: width * 0.9,
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
      backgroundColor: "#004c99",
      paddingVertical: height * 0.015,
      borderRadius: 20,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
};

export default EditProfileStyles;
