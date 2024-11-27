import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AuthScreen from "./AuthScreen";
import { AuthContext } from "../../context/providers/AuthContext";
import getWindowDimensions from "../../utils/helpers/dimensions";
import Icon from "react-native-vector-icons/FontAwesome";
import { IMAGES } from "../../utils/contants/images";
import createSignUpStyles from "../../Styles/Screens/SignUpStyle";

const { width, height } = getWindowDimensions();
const styles = createSignUpStyles(width, height);

const SignUpScreen = ({ navigation }) => {
  const { setAuthType, setCustomComponent } = useContext(AuthContext);
  useEffect(() => {
    setAuthType("Sign up");
    const CustomComponent = () => (
      <View style={styles.scrollContent}>
        <Text style={styles.signUpText}>
          Already Registerd?
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </Text>
        <Image source={IMAGES.SIGNUP} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="user" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="User Role"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="envelope" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
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
        <View style={styles.inputContainer}>
          <Text>
            <Icon name="lock" size={width * 0.06} color="#aaa" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Conifrm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("ExporterDashboardStack")}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text style={styles.ortext}>Or</Text>
        <TouchableOpacity style={styles.GoogleButton}>
          <Image source={IMAGES.Google} style={styles.Googlelogo} />
          <Text style={styles.GoogleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
    );
    setCustomComponent(<CustomComponent />);
  }, [setAuthType, setCustomComponent, navigation]);
  return <AuthScreen />;
};

export default SignUpScreen;
