import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AboutMeSection from "../../components/common/AboutMeSection";
import IconButton from "../../components/common/IconButton";
import ProfileImage from "../../components/common/ProfileImage";
import ProfileInfo from "../../components/common/ProfileInfo";
import ReviewsList from "../../components/common/ReviewsList";
import { authService } from "../../services/authService";
import { storageService } from "../../services/storageService";
import { createProfileScreenStyles } from "../../Styles/Screens/ProfileScreenStyles";
import { STORAGE_KEYS } from "../../utils/contants/constants";
import getWindowDimensions from "../../utils/helpers/dimensions";
import EditProfile from "./EditProfile";

const { width, height } = getWindowDimensions();
const styles = createProfileScreenStyles(width, height);

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("Khadim Hussain");
  const [email, setEmail] = useState("devKhadimHussain@gmail.com");
  const [phone, setPhone] = useState("+923434052098");
  const [address, setAddress] = useState(
    "Muhala Harar China Chowk Sialkot, Pakistan"
  );
  const [aboutMe, setAboutMe] = useState(
    "Amazing work, highly recommended! What are you doing nowadays? You do not even tell me what is happening."
  );

  // Add missing states for username, companyName, and cnic
  const [username, setUsername] = useState("azman123");
  const [companyName, setCompanyName] = useState("Preeindustry");
  const [cnic, setCnic] = useState("12345-6789012-3");

  useEffect(() => {
    const getPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to enable permissions to access the gallery."
        );
      }
    };

    getPermission();

    // Load user data from storage
    const loadUserData = async () => {
      try {
        const userDataResponse = await storageService.get(STORAGE_KEYS.USER_DATA);
        if (userDataResponse.success && userDataResponse.data) {
          const userData = userDataResponse.data;
          if (userData.username) setName(userData.username);
          if (userData.email) setEmail(userData.email);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            await authService.logout(navigation);
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <ProfileImage
          image={image}
          setImage={setImage}
          width={width}
          height={height}
        />
        <ProfileInfo
          name={name}
          email={email}
          phone={phone}
          address={address}
          width={width}
          height={height}
        />
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.editIcon}
        >
          <Ionicons name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statsText}>⭐ 5.0</Text>
        <Text style={styles.statsText}>💬 0</Text>
        <Text style={styles.statsText}>🚀 50%</Text>
      </View>

      <View style={styles.verifications}>
        {["person", "call", "document", "mail", "logo-facebook"].map(
          (iconName) => (
            <IconButton
              key={iconName}
              iconName={iconName}
              width={width}
              height={height}
            />
          )
        )}
      </View>

      <AboutMeSection aboutMe={aboutMe} width={width} height={height} />

      <View>
        <Text style={styles.reviewText}>Reviews</Text>
      </View>
      <ReviewsList />

      <TouchableOpacity
        style={logoutStyles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="white" style={logoutStyles.logoutIcon} />
        <Text style={logoutStyles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <EditProfile
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        address={address}
        setAddress={setAddress}
        aboutMe={aboutMe}
        setAboutMe={setAboutMe}
        username={username}
        setUsername={setUsername}
        companyName={companyName}
        setCompanyName={setCompanyName}
        cnic={cnic}
        setCnic={setCnic}
      />
    </View>
  );
};

const logoutStyles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutIcon: {
    marginRight: 8,
  }
});

export default ProfileScreen;
