import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authService } from "../../services/authService";
import getForgetPasswordStyles from "../../Styles/Screens/ForgetPasswordStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = getForgetPasswordStyles(width, height);

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRequestReset = async () => {
    if (!email || !email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.forgotPassword(email);

      if (response.success) {
        setStep(2);
        Alert.alert("Success", "A 6-digit verification code has been sent to your email");
      } else {
        setError(response.message || "Failed to send reset code. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error requesting password reset:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetToken || resetToken.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    if (!newPassword || !newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.resetPassword(email, resetToken, newPassword);

      if (response.success) {
        Alert.alert(
          "Success",
          "Your password has been reset successfully",
          [{ text: "OK", onPress: () => navigation.navigate("SignInScreen") }]
        );
      } else {
        setError(response.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error resetting password:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {step === 1 ? (
        <>
          <Text style={styles.label}>Enter your email address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRequestReset}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate("SignInScreen")}
          >
            <Text style={styles.linkText}>Back to Sign In</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter the 6-digit verification code sent to your email:</Text>
          <TextInput
            style={styles.input}
            placeholder="6-digit code"
            keyboardType="numeric"
            maxLength={6}
            value={resetToken}
            onChangeText={setResetToken}
          />

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

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setStep(1)}
          >
            <Text style={styles.linkText}>Back to Email Entry</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ForgetPasswordScreen;
