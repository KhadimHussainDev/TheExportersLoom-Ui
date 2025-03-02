import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import getForgetPasswordStyles from "../../Styles/Screens/ForgetPasswordStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = getForgetPasswordStyles(width, height);

const ForgetPasswordScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // Storing user data for debugging/logging
    const userData = {
      resetMethod: method,
      verificationCode: code,
      newPassword: newPassword,
    };

    console.log("User Reset Data:", JSON.stringify(userData, null, 2));

    Alert.alert("Success", "Password reset successfully!");
    navigation.navigate("SignInScreen"); // Navigate back to Sign In
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>

      {step === 1 && (
        <>
          <Text style={styles.label}>
            Choose how you want to receive the reset code:
          </Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setMethod("SMS");
              setStep(2);
            }}
          >
            <Text style={styles.optionText}>📱 Receive via SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setMethod("Email");
              setStep(2);
            }}
          >
            <Text style={styles.optionText}>📧 Receive via Email</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>
            Enter the verification code sent to your {method}:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity style={styles.button} onPress={() => setStep(3)}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Enter your new password:</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm your new password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ForgetPasswordScreen;
