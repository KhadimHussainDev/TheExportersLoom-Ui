import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileImage from "../../components/common/ProfileImage";
import ProfileInfo from "../../components/common/ProfileInfo";
import IconButton from "../../components/common/IconButton";
import AboutMeSection from "../../components/common/AboutMeSection";
import EditProfile from "./EditProfile";
import ReviewsList from "../../components/common/ReviewsList";
import { createProfileScreenStyles } from "../../Styles/Screens/ProfileScreenStyles";
import * as ImagePicker from "expo-image-picker";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = createProfileScreenStyles(width, height);

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("Azman Shakir");
  const [email, setEmail] = useState("azmansha1234@gmail.com");
  const [phone, setPhone] = useState("+923091571051");
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
  }, []);

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

export default ProfileScreen;
