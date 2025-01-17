import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileImage from "../../components/common/ProfileImage";
import ProfileInfo from "../../components/common/ProfileInfo";
import IconButton from "../../components/common/IconButton";
import AboutMeSection from "../../components/common/AboutMeSection";
import EditProfile from "./EditProfile";
import ReviewsList from "../../components/common/ReviewsList";
import { createProfileScreenStyles } from "../../Styles/Screens/ProfileScreenStyles";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");
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
    "Amazing work, highly recommended! What are you doing nowadays? You do not even tell me what is happening. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  );

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
        <Text style={styles.ReviewText}>Reviews</Text>
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
      />
    </View>
  );
};

export default ProfileScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import EditProfileScreen from "../issueSolved";
// import ReviewsList from "../../components/common/ReviewsList";

// const ProfileScreen = () => {
//   const [image, setImage] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [name, setName] = useState("Azman Shakir");
//   const [email, setEmail] = useState("azmansha1234@gmail.com");
//   const [phone, setPhone] = useState("+923091571051");
//   const [address, setAddress] = useState(
//     "Muhala Harar China Chowk Sialkot, Pakistan"
//   );
//   const [aboutMe, setAboutMe] = useState(
//     "Amazing work, highly recommended! What are you doing nowadays? You do not even tell me what is happening. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
//   );

//   useEffect(() => {
//     const getPermission = async () => {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Denied",
//           "You need to enable permissions to access the gallery."
//         );
//       } else {
//         console.log("Permission granted");
//       }
//     };

//     getPermission();
//   }, []);

//   const pickImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaType.Images, // Use the correct enumeration value
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setImage(result.uri);
//         console.log("Image URI:", result.uri);
//       } else {
//         console.log("Image pick cancelled");
//       }
//     } catch (error) {
//       console.log("Error picking image:", error);
//       Alert.alert(
//         "Error",
//         "There was an issue picking the image. Please try again."
//       );
//     }
//   };

//   const handleIconPress = (iconName) => {
//     Alert.alert("Icon Pressed", `${iconName} icon was pressed.`);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileSection}>
//         <TouchableOpacity onPress={pickImage}>
//           <Image
//             source={
//               image
//                 ? { uri: image }
//                 : require("../../assets/images/Profile.png")
//             }
//             style={styles.profileImage}
//           />
//         </TouchableOpacity>
//         <View style={styles.infoSection}>
//           <Text style={styles.name}>{name}</Text>
//           <Text style={styles.email}>{email}</Text>
//           <Text style={styles.phone}>{phone}</Text>
//           <Text
//             style={[
//               styles.address,
//               { fontSize: address.length > 30 ? 12 : 14 },
//             ]}
//           >
//             {address}
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => setIsModalVisible(true)}
//           style={styles.editIcon}
//         >
//           <Ionicons name="pencil" size={20} color="black" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.statsSection}>
//         <Text>⭐ 5.0</Text>
//         <Text>💬 0</Text>
//         <Text>🚀 50%</Text>
//       </View>

//       <View style={styles.verifications}>
//         <TouchableOpacity onPress={() => handleIconPress("User")}>
//           <Ionicons name="person" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleIconPress("Phone")}>
//           <Ionicons name="call" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleIconPress("Document")}>
//           <Ionicons name="document" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleIconPress("Mail")}>
//           <Ionicons name="mail" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleIconPress("Facebook")}>
//           <Ionicons name="logo-facebook" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.aboutMeSection}>
//         <Text style={styles.aboutMeTitle}>About Me</Text>
//         <Text style={styles.aboutMeText}>{aboutMe}</Text>
//       </View>

//       <View>
//         <Text style={styles.ReviewText}>Reviews</Text>
//       </View>
//       <ReviewsList />

//       {/* Modal for Edit Profile */}
//       <EditProfileScreen
//         isModalVisible={isModalVisible}
//         setIsModalVisible={setIsModalVisible}
//         name={name}
//         setName={setName}
//         email={email}
//         setEmail={setEmail}
//         phone={phone}
//         setPhone={setPhone}
//         address={address}
//         setAddress={setAddress}
//         aboutMe={aboutMe}
//         setAboutMe={setAboutMe}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f7f7f7",
//   },
//   profileSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 20,
//     borderWidth: 2,
//     borderColor: "#000",
//   },
//   infoSection: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   email: {
//     fontSize: 16,
//     color: "#555",
//   },
//   phone: {
//     fontSize: 16,
//     color: "#555",
//   },
//   address: {
//     fontSize: 14,
//     color: "#333",
//     marginVertical: 5,
//   },
//   editIcon: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//   },
//   statsSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 15,
//   },
//   verifications: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 15,
//     backgroundColor: "#013240",
//   },
//   aboutMeSection: {
//     marginVertical: 20,
//   },
//   aboutMeTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   aboutMeText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   ReviewText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

// export default ProfileScreen;
