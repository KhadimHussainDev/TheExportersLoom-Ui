import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../context/providers/AuthContext";
import { authService } from "../../services/authService";
import createSignUpStyles from "../../Styles/Screens/SignUpStyle";
import { ROLES } from "../../utils/contants/constants";
import { IMAGES } from "../../utils/contants/images";
import getWindowDimensions from "../../utils/helpers/dimensions";
import AuthScreen from "./AuthScreen";

const { width, height } = getWindowDimensions();
const styles = createSignUpStyles(width, height);

const SignUpScreen = ({ navigation }) => {
  const { setAuthType, setCustomComponent } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validate inputs
    if (!email || !password || !confirmPassword || !userRole) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Call the sign-up service
      const response = await authService.signUp(email, password, userRole);

      // Check if the sign-up was successful
      if (!response.success) {
        Alert.alert("Sign-Up Failed", response.message || "Failed to create account");
        return;
      }

      // Success
      Alert.alert(
        "Success",
        "Account created successfully! Please sign in with your new credentials.",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("SignInScreen")
          }
        ]
      );
    } catch (error) {
      console.error("Sign-Up Error:", error);

      if (error.message && error.message.includes("Network")) {
        Alert.alert("Connection Error", "Please check your internet connection and try again");
      } else {
        Alert.alert("Sign-Up Failed", error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Define CustomComponent inside useCallback so it doesn't recreate unnecessarily
  const CustomComponent = useCallback(() => {
    return (
      <View style={styles.scrollContent}>
        <Text style={styles.signUpText}>
          Already Registered?{" "}
          <TouchableOpacity onPress={() => navigation.replace("SignInScreen")}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </Text>
        <Image source={IMAGES.SIGNUP} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="user" size={width * 0.06} color="#aaa" />
          </Text>
          <Picker
            selectedValue={userRole}
            style={styles.DropDown}
            onValueChange={(itemValue) => setUserRole(itemValue)}
          >
            <Picker.Item label="Select User Role" value="" />
            <Picker.Item label="Manufacturer" value={ROLES.MANUFACTURER} />
            <Picker.Item label="Exporter" value={ROLES.EXPORTER} />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="envelope" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="lock" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="lock" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.ortext}>Or</Text>
        <TouchableOpacity style={styles.GoogleButton}>
          <Image source={IMAGES.Google} style={styles.Googlelogo} />
          <Text style={styles.GoogleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }, [navigation, userRole, email, password, confirmPassword, loading]);

  useEffect(() => {
    setAuthType("Sign up");
    setCustomComponent(CustomComponent); // Pass function instead of JSX
  }, [setAuthType, setCustomComponent, CustomComponent]);

  return <AuthScreen />;
};

export default SignUpScreen;