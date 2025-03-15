import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AboutMeSection from "../../components/common/AboutMeSection";
import IconButton from "../../components/common/IconButton";
import ProfileImage from "../../components/common/ProfileImage";
import ProfileInfo from "../../components/common/ProfileInfo";
import ReviewsList from "../../components/common/ReviewsList";
import SkeletonPlaceholder from "../../components/common/SkeletonPlaceholder";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";
import { createProfileScreenStyles } from "../../Styles/Screens/ProfileScreenStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { extractBase64FromDataUri, isDataUri } from "../../utils/helpers/imageUtils";
import EditProfile from "./EditProfile";

const { width, height } = getWindowDimensions();
const styles = createProfileScreenStyles(width, height);

const ProfileScreen = ({ navigation }) => {
  // State for profile data
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [cnic, setCnic] = useState("");

  // State for reviews and stats
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

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
    loadUserData();
  }, []);

  // Load user data from API
  const loadUserData = async () => {
    setIsLoading(true);
    setProfileLoaded(false);
    setReviewsLoaded(false);

    try {
      // Get user ID from storage
      const userId = await userService.getCurrentUserId();

      if (!userId) {
        console.error('User ID not found in storage');
        setIsLoading(false);
        return;
      }

      // Fetch user profile
      const profileResponse = await userService.getUserProfile(userId);
      console.log('Profile response:', profileResponse);
      if (profileResponse.success && profileResponse.data) {
        const profileData = profileResponse.data;
        setName(profileData.name || "");
        setEmail(profileData.email || "");
        setPhone(profileData.phoneNo || "");
        setAddress(profileData.address || "");
        setAboutMe(profileData.bio || "");
        setUsername(profileData.username || "");
        setCompanyName(profileData.companyName || "");
        setCnic(profileData.cnic || "");

        // Handle the picture which could be a base64 string or a URL
        const picture = profileData.picture || null;

        // If the picture is a data URI, extract just the base64 part
        if (picture && isDataUri(picture)) {
          setImage(extractBase64FromDataUri(picture));
        } else {
          setImage(picture);
        }

        setRating(profileData.averageRating || 0);
        setProfileLoaded(true);
      } else {
        console.error('Failed to fetch profile data:', profileResponse.message);
        Alert.alert('Error', 'Failed to load profile data');
      }

      // Fetch user reviews
      const reviewsResponse = await userService.getUserReviews(userId);
      if (reviewsResponse.success && reviewsResponse.data) {
        // Sort reviews by date (newest first)
        const sortedReviews = [...reviewsResponse.data].sort((a, b) => {
          const dateA = new Date(a.reviewDate || 0);
          const dateB = new Date(b.reviewDate || 0);
          return dateB - dateA; // Descending order (newest first)
        });

        setReviews(sortedReviews);
        setReviewsCount(sortedReviews.length);
        setReviewsLoaded(true);
      } else {
        console.error('Failed to fetch reviews:', reviewsResponse.message);
        setReviews([]);
        setReviewsCount(0);
        setReviewsLoaded(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'An error occurred while loading your profile');
    } finally {
      setIsLoading(false);
    }
  };

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

  // Render skeleton loading UI
  const renderSkeletonLoading = () => (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={80} height={80} borderRadius={40} />
        </SkeletonPlaceholder>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width="70%" height={20} borderRadius={4} marginBottom={10} />
            <SkeletonPlaceholder.Item width="90%" height={15} borderRadius={4} marginBottom={6} />
            <SkeletonPlaceholder.Item width="60%" height={15} borderRadius={4} marginBottom={6} />
            <SkeletonPlaceholder.Item width="80%" height={15} borderRadius={4} />
          </SkeletonPlaceholder>
        </View>
      </View>

      <View style={styles.statsSection}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width="30%" height={20} borderRadius={4} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width="30%" height={20} borderRadius={4} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width="30%" height={20} borderRadius={4} />
        </SkeletonPlaceholder>
      </View>

      <View style={styles.verifications}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <SkeletonPlaceholder key={index}>
            <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
          </SkeletonPlaceholder>
        ))}
      </View>

      <View style={{ marginVertical: 15 }}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width="40%" height={20} borderRadius={4} marginBottom={10} />
          <SkeletonPlaceholder.Item width="100%" height={80} borderRadius={8} />
        </SkeletonPlaceholder>
      </View>

      <View style={{ marginTop: 15 }}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width="40%" height={20} borderRadius={4} marginBottom={10} />
          <SkeletonPlaceholder.Item width="100%" height={80} borderRadius={8} marginBottom={10} />
          <SkeletonPlaceholder.Item width="100%" height={80} borderRadius={8} />
        </SkeletonPlaceholder>
      </View>
    </View>
  );

  if (isLoading) {
    return renderSkeletonLoading();
  }

  // Placeholder text for empty fields
  const getPlaceholderText = (field, defaultText) => {
    if (!field || field.trim() === '') {
      return <Text style={styles.placeholderText}>{defaultText}</Text>;
    }
    return field;
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
          name={name || "Add your name"}
          email={email || "Add your email"}
          phone={phone || "Add your phone number"}
          address={address || "Add your address"}
          width={width}
          height={height}
          showPlaceholders={true}
        />
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.editIcon}
        >
          <Ionicons name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{rating.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{reviewsCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
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

      <AboutMeSection
        aboutMe={aboutMe || "Tell us about yourself..."}
        width={width}
        height={height}
        isEmpty={!aboutMe || aboutMe.trim() === ''}
      />

      <View>
        <Text style={styles.reviewText}>Reviews ({reviewsCount})</Text>
      </View>
      {!reviewsLoaded ? (
        <View style={styles.reviewsLoadingContainer}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width="100%" height={80} borderRadius={8} marginBottom={10} />
            <SkeletonPlaceholder.Item width="100%" height={80} borderRadius={8} />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <ReviewsList reviews={reviews} />
      )}

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
        onProfileUpdated={loadUserData}
        image={image}
        setImage={setImage}
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
