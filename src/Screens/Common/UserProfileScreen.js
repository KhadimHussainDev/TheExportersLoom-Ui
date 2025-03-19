import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SkeletonPlaceholder from "../../components/common/SkeletonPlaceholder";
import UserAboutSection from "../../components/user/UserAboutSection";
import UserProfileImage from "../../components/user/UserProfileImage";
import UserProfileInfo from "../../components/user/UserProfileInfo";
import UserReviewsList from "../../components/user/UserReviewsList";
import UserStatistics from "../../components/user/UserStatistics";
import UserVerifications from "../../components/user/UserVerifications";
import { userService } from "../../services/userService";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { extractBase64FromDataUri, isDataUri } from "../../utils/helpers/imageUtils";

const { width, height } = getWindowDimensions();

const UserProfileScreen = ({ route }) => {
  // Get userId from route parameters
  const { userId } = route.params || {};

  // State for profile data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    username: "",
    companyName: "",
    picture: null,
    averageRating: 0,
    totalOrders: 0,
    experienceYears: 0,
    specialization: ""
  });

  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUserData(userId);
    }
  }, [userId]);

  // Load user data from API
  const loadUserData = async (userId) => {
    setIsLoading(true);
    setProfileLoaded(false);
    setReviewsLoaded(false);

    try {
      // Fetch user profile
      const profileResponse = await userService.getUserProfile(userId);

      if (profileResponse.success && profileResponse.data) {
        const profileData = profileResponse.data;

        // Handle the picture which could be a base64 string or a URL
        let processedPicture = null;
        if (profileData.picture && isDataUri(profileData.picture)) {
          processedPicture = extractBase64FromDataUri(profileData.picture);
        } else {
          processedPicture = profileData.picture;
        }

        setUserData({
          name: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phoneNo || "",
          address: profileData.address || "",
          bio: profileData.bio || "",
          username: profileData.username || "",
          companyName: profileData.companyName || "",
          picture: processedPicture,
          averageRating: profileData.averageRating || 0,
          totalOrders: profileData.totalOrders || 0,
          experienceYears: profileData.experienceYears || 0,
          specialization: profileData.specialization || ""
        });

        setProfileLoaded(true);
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
        setReviews([]);
        setReviewsCount(0);
        setReviewsLoaded(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileSection}>
        <UserProfileImage image={userData.picture} width={width} height={height} />
        <UserProfileInfo
          name={userData.name || "Not specified"}
          email={userData.email || "Not specified"}
          phone={userData.phone || "Not specified"}
          address={userData.address || "Not specified"}
          companyName={userData.companyName || "Not specified"}
          specialization={userData.specialization || "Not specified"}
          width={width}
          height={height}
        />
      </View>

      <UserStatistics
        rating={userData.averageRating}
        reviewsCount={reviewsCount}
        totalOrders={userData.totalOrders}
        experienceYears={userData.experienceYears}
      />

      <UserVerifications
        isEmailVerified={!!userData.email}
        isPhoneVerified={!!userData.phone}
        width={width}
        height={height}
      />

      <UserAboutSection
        aboutMe={userData.bio || "No bio provided."}
        width={width}
        height={height}
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
        <UserReviewsList reviews={reviews} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  verifications: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  reviewText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  reviewsLoadingContainer: {
    marginBottom: 20,
  },
});

export default UserProfileScreen; 