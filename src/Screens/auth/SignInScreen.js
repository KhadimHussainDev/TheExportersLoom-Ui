import jwtDecode from 'jwt-decode';
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
import createSignInStyles from "../../Styles/Screens/SignInStyle";
import { IMAGES, ROLES } from "../../utils/contants/images";
import getWindowDimensions from "../../utils/helpers/dimensions";
import AuthScreen from "./AuthScreen";

const { width, height } = getWindowDimensions();
const styles = createSignInStyles(width, height);

const SignInScreen = ({ navigation }) => {
  const { setAuthType, setCustomComponent } = useContext(AuthContext);

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

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
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
  }, [setAuthType, setCustomComponent, navigation, userCredentials]);

  const handleSignIn = async () => {
    console.log("User Credentials:", JSON.stringify(userCredentials, null, 2));
    Alert.alert("Sign-In Successful", `Welcome Exporter!`);
    navigation.navigate("ExporterDashboardStack");
  };

  // const handleSignIn = async () => {
  //   Alert.alert('Sign-In Successful', `Welcome Khadim!`);
  //   navigation.navigate('ExporterDashboardStack'); // Replace 'Home' with your target screen
  //   // try {
  //   //   const data = await signIn(email, password);
  //   //   const decodedToken = decodeJWT(data.access_token); // Manually decode the access token
  //   //   await AsyncStorage.setItem('access_token', data.access_token); // Store the access token
  //   //   console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging
  //   //   Alert.alert('Sign-In Successful', `Welcome ${decodedToken.username}`);
  //   //   if (decodedToken.userType == ROLES.manufacturer){
  //   //     //Goto manufecturer dashboard

  //   //   }else if (decodedToken.userType == ROLES.exporter){
  //   //     //Goto exporter dashboard
  //   //     navigation.navigate('ExporterDashboardStack'); // Replace 'Home' with your target screen
  //   //   }
  //   // } catch (error) {
  //   //   Alert.alert('Sign-In Failed', 'Invalid email or password');
  //   //   console.error('Sign-In Error:', error);
  //   // }
  // };
  return <AuthScreen />;
};

export default SignInScreen;