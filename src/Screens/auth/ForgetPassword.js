import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ForgetPassword = ({ navigation }) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signUpButton: {
    backgroundColor: "#3498db",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
  },
  loginLink: {
    color: "#3498db",
    textDecorationLine: "underline",
  },
});

export default ForgetPassword;
