import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import RatingStars from "./src/components/common/RatingStars";

const reviews = [
  {
    name: "User 1",
    projectName: "Project Alpha",
    comment:
      "Amazing work, highly recommended! What are you ding now a days you do not even tell me what is happening",
    rating: 5,
  },
  {
    name: "User 2",
    projectName: "Project Beta",
    comment: "Good quality and delivered on time.",
    rating: 4,
  },
  {
    name: "User 3",
    projectName: "Project Gamma",
    comment: "Satisfactory results, but room for improvement.",
    rating: 3,
  },
  {
    name: "User 4",
    projectName: "Project Delta",
    comment: "Excellent attention to detail.",
    rating: 5,
  },
  {
    name: "User 5",
    projectName: "Project Epsilon",
    comment: "Decent work, met expectations.",
    rating: 4,
  },
  {
    name: "User 6",
    projectName: "Project Zeta",
    comment: "Not satisfied with the results.",
    rating: 2,
  },
  {
    name: "User 7",
    projectName: "Project Eta",
    comment: "Great experience, would hire again.",
    rating: 5,
  },
  {
    name: "User 8",
    projectName: "Project Theta",
    comment: "Good work, but a bit delayed.",
    rating: 3,
  },
  {
    name: "User 9",
    projectName: "Project Iota",
    comment: "Fantastic job, exceeded expectations!",
    rating: 5,
  },
  {
    name: "User 10",
    projectName: "Project Kappa",
    comment: "Average work, nothing extraordinary.",
    rating: 3,
  },
];

const ReviewList = () => {
  return (
    <ScrollView style={styleReviews.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styleReviews.card}>
          <Image
            source={require("././src/assets/images/Profile.png")}
            style={styleReviews.profileImage}
          />
          <View style={styleReviews.textContainer}>
            <Text style={styleReviews.userName}>{review.name}</Text>
            <Text style={styleReviews.projectName}>{review.projectName}</Text>
            <Text style={styleReviews.comment}>{review.comment}</Text>
          </View>
          <View style={styleReviews.ratingContainer}>
            <RatingStars rating={review.rating} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("Azman Shakir");
  const [email, setEmail] = useState("azmansha1234@gmail.com");
  const [phone, setPhone] = useState("+923091571051");
  const [address, setAddress] = useState(
    "Muhala Harar China Chowk Sialkot, Pakistan"
  );
  const [aboutMe, setAboutMe] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permissions to access the gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully!"
      );
      setIsModalVisible(false);
    }
  };

  const handleIconPress = (iconName) => {
    Alert.alert("Icon Pressed", `${iconName} icon was pressed.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              image
                ? { uri: image }
                : require("././src/assets/images/Profile.png")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.infoSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.phone}>{phone}</Text>
          <Text
            style={[
              styles.address,
              { fontSize: address.length > 30 ? 12 : 14 },
            ]}
          >
            {address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.editIcon}
        >
          <Ionicons name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsSection}>
        <Text>⭐ 5.0</Text>
        <Text>💬 0</Text>
        <Text>🚀 50%</Text>
      </View>

      <View style={styles.verifications}>
        <TouchableOpacity onPress={() => handleIconPress("User")}>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress("Phone")}>
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress("Document")}>
          <Ionicons name="document" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress("Mail")}>
          <Ionicons name="mail" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress("Facebook")}>
          <Ionicons name="logo-facebook" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutMeSection}>
        <Text style={styles.aboutMeTitle}>About Me</Text>
        <Text style={styles.aboutMeText}>{aboutMe}</Text>
      </View>
      <View>
        <Text style={styles.ReviewText}>Reviews</Text>
      </View>
      <ReviewList />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Old Password"
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowOldPassword(!showOldPassword)}
            >
              <Ionicons
                name={showOldPassword ? "eye" : "eye-off"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons
                name={showNewPassword ? "eye" : "eye-off"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm New Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.aboutMeInput}
            placeholder="About Me"
            value={aboutMe}
            onChangeText={(text) => setAboutMe(text)}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: "red" }]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#F9F9F9",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 12,
    color: "gray",
  },
  phone: {
    fontSize: 12,
    color: "gray",
  },
  address: {
    fontSize: 14,
    color: "blue",
  },
  editIcon: {
    marginLeft: 10,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  verifications: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#013240",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 25,
  },
  aboutMeInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#004c99",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  aboutMeSection: {
    backgroundColor: "#fff", // Keep existing background color
    borderRadius: 8,
    padding: 10, // Match the padding from verifications
    marginVertical: 10, // Match the vertical margin from verifications
    marginHorizontal: 10, // Match the horizontal margin from verifications
    shadowColor: "#000", // Existing shadow styling
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  aboutMeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#013240",
  },
  aboutMeText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  ReviewText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#013240",
    marginLeft: 20,
  },
});
const styleReviews = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  projectName: {
    color: "#555",
    marginVertical: 2,
    fontSize: 14,
  },
  comment: {
    color: "#777",
    marginVertical: 2,
    fontSize: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
export default function App() {
  return (
    <View style={styles1.container}>
      <ProfileScreen />
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/Navigations/Navigators/AppNavigator"; // Adjust the path accordingly

// const App = () => {
//   return <AppNavigator />;
// };

// export default App;In this code I want the Modal Form Functionality to be in separate Screen and also styles related to modal form should also be separate file .  
