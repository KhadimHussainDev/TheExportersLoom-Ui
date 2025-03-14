import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from "react";
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
import { storageService } from "../../services/storageService";
import createSignInStyles from "../../Styles/Screens/SignInStyle";
import { ROLES, STORAGE_KEYS } from "../../utils/constants";
import { IMAGES } from "../../utils/contants/images";
import getWindowDimensions from "../../utils/helpers/dimensions";
import AuthScreen from "./AuthScreen";

const { width, height } = getWindowDimensions();
const styles = createSignInStyles(width, height);

const SignInScreen = ({ navigation }) => {
  const { setAuthType, setCustomComponent } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Single state object for user credentials
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  // Function to handle input change
  const handleInputChange = (field, value) => {
    setUserCredentials((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setAuthType("Sign In");

    const CustomComponent = (
      <View style={styles.scrollContent}>
        <Image source={IMAGES.SIGNIN} style={styles.logo} />

        <View style={styles.inputContainer}>
          <Text>
            <Icon name="user" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
            placeholderTextColor="#aaa"
            value={userCredentials.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
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
            value={userCredentials.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.replace("SignUpScreen")}>
            <Text style={styles.signInLink}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );

    setCustomComponent(CustomComponent);
  }, [setAuthType, setCustomComponent, navigation, userCredentials, loading]);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // Validate inputs
      if (!userCredentials.email || !userCredentials.password) {
        Alert.alert("Error", "Please enter both email and password");
        setLoading(false);
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userCredentials.email)) {
        Alert.alert("Error", "Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Call the sign-in service
      const response = await authService.signIn(userCredentials.email, userCredentials.password);

      // Check if response contains access token
      if (!response.success) {
        Alert.alert("Sign-In Failed", response.message || "Invalid credentials");
        setLoading(false);
        return;
      }
      console.log(response.data.accessToken);

      // Decode the token
      const decodedToken = jwtDecode(response.data.accessToken);

      // Store the token in storage
      await storageService.set(STORAGE_KEYS.USER_TOKEN, response.data.accessToken);

      // Store user data
      await storageService.set(STORAGE_KEYS.USER_DATA, {
        userId: decodedToken.userId || decodedToken.sub,
        username: decodedToken.username,
        userType: decodedToken.userType,
        email: userCredentials.email
      });

      // Success message
      Alert.alert("Sign-In Successful", `Welcome ${decodedToken.username || 'User'}!`);

      // Reset navigation stack to prevent going back to login screen
      if (decodedToken.userType === ROLES.MANUFACTURER) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ManufacturerDashboardStack' }],
        });
      } else {
        // For exporters or any other role
        navigation.reset({
          index: 0,
          routes: [{ name: 'ExporterDashboardStack' }],
        });
      }
    } catch (error) {
      console.error("Sign-In Error:", error);

      if (error.message && error.message.includes("Network")) {
        Alert.alert("Connection Error", "Please check your internet connection and try again");
      } else {
        Alert.alert("Sign-In Failed", error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return <AuthScreen />;
};

export default SignInScreen;