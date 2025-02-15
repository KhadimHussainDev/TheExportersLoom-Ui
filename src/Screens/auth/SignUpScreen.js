import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import AuthScreen from "./AuthScreen";
import { AuthContext } from "../../context/providers/AuthContext";
import getWindowDimensions from "../../utils/helpers/dimensions";
import Icon from "react-native-vector-icons/FontAwesome";
import { IMAGES, ROLES } from "../../utils/contants/images";
import createSignUpStyles from "../../Styles/Screens/SignUpStyle";
import { signUp } from "../../api/auth"; // Import the signUp function

const { width, height } = getWindowDimensions();
const styles = createSignUpStyles(width, height);

const SignUpScreen = ({ navigation }) => {
  const { setAuthType, setCustomComponent } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState(''); // State for user role

  useEffect(() => {
    setAuthType("Sign up");
    const CustomComponent = () => (
      <View style={styles.scrollContent}>
        <Text style={styles.signUpText}>
          Already Registered?
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
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
            style={styles.input}
            onValueChange={(itemValue) => setUserRole(itemValue)}
          >
            <Picker.Item label="Select User Role" value="" />
            <Picker.Item label="Manufacturer" value={ROLES.manufacturer} />
            <Picker.Item label="Exporter" value={ROLES.exporter} />
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
            // value={email}
            // onChangeText={setEmail}
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
            // value={password}
            // onChangeText={setPassword}
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
            // value={confirmPassword}
            // onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.ortext}>Or</Text>
        <TouchableOpacity style={styles.GoogleButton}>
          <Image source={IMAGES.Google} style={styles.Googlelogo} />
          <Text style={styles.GoogleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
    );
    setCustomComponent(<CustomComponent />);
  }, [setAuthType, setCustomComponent, navigation, userRole, email, password, confirmPassword]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   Alert.alert('Error', 'Please enter a valid email address');
    //   return;
    // }
    if (!userRole) {
      Alert.alert('Error', 'Please select a user role');
      return;
    }
          Alert.alert('Sign-Up Successful', 'Your account has been created');
          navigation.navigate('SignInScreen');
  //   try {
  //     const data = await signUp(email, password, userRole);
  //     if(data.statusCode == "200"){

  //       Alert.alert('Sign-Up Successful', 'Your account has been created');
  //       navigation.navigate('SignInScreen'); // Navigate to sign-in screen after successful sign-up
  //     }else{
  //       Alert.alert('Sign-Up Failed', data.error);
  //     }
  //   } catch (error) {
  //     Alert.alert('Sign-Up Failed', 'An error occurred during sign-up');
  //     console.error('Sign-Up Error:', error);
  //   }
  };

  return <AuthScreen />;
};

export default SignUpScreen;