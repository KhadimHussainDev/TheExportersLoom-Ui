import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import AuthScreen from "./AuthScreen";
import { AuthContext } from "../../context/providers/AuthContext";
import getWindowDimensions from "../../utils/helpers/dimensions";
import createSignInStyles from "../../Styles/Screens/SignInStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { IMAGES } from "../../utils/contants/images";
const { width, height } = getWindowDimensions();
const styles = createSignInStyles(width, height);

const SignInScreen = ({ navigation }) => {
  const { setAuthType, setCustomComponent } = useContext(AuthContext);
  useEffect(() => {
    setAuthType("Sign In");
    const CustomComponent = () => (
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
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.signInText}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={styles.signInLink}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
    setCustomComponent(<CustomComponent />);
  }, [setAuthType, setCustomComponent, navigation]);
  return <AuthScreen />;
};

export default SignInScreen;
