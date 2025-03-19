import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Animated, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ManufacturerCardStyle from "../../Styles/Components/ManufacturerCardStyle";
import { IMAGES } from "../../utils/contants/images";
import getWindowDimensions from "../../utils/helpers/dimensions";
import RatingStars from "../common/RatingStars";

const { width, height } = getWindowDimensions();
const styles = ManufacturerCardStyle(width, height);

const ManufacturerCard = ({
  name,
  profileImage,
  distance,
  price,
  rating,
  days,
  moduleType,
  bidId,
  userId
}) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Function to navigate to user profile screen
  const handleProfilePress = () => {
    if (userId) {
      navigation.navigate("UserProfileScreen", { userId });
    } else {
      Alert.alert(
        "Error",
        "Could not load profile. User information is missing."
      );
    }
  };

  // Function to show alert dialog
  const handleChatPress = () => {
    Alert.alert(
      "Assign Module", // Title
      `Would you like to assign this module to ${name}?`, // Message with module name
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            Alert.alert(
              "Module Assigned",
              `Module has been successfully assigned to ${name}.`
            );
          }
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.cardContent}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleProfilePress}>
              <Image
                source={typeof profileImage === 'string' ? { uri: profileImage } : IMAGES.Profile}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.name}>{name}</Text>
              <RatingStars rating={rating || 0} size={14} />
            </View>
          </View>

          <View style={styles.priceDistanceSection}>
            <View style={styles.infoRow}>
              <Icon name="pricetag-outline" size={16} color={styles.price.color} />
              <Text style={styles.price}>
                Est. PKR {typeof price === 'number' ? price.toFixed(2) : 'N/A'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={16} color={styles.distance.color} />
              <Text style={styles.distance}>
                {typeof distance === 'number' ? distance.toFixed(1) : 'N/A'} km
              </Text>
            </View>
          </View>

          <View style={styles.chatSection}>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={handleChatPress}
              activeOpacity={0.7}
            >
              <Icon name="chatbox-ellipses-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.infoRow}>
              <Text style={styles.days}>Est. {days || 'N/A'} Days</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ManufacturerCard;
