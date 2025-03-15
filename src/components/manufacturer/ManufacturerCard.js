import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ManufacturerCardStyle from "../../Styles/Components/ManufacturerCardStyle";
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
  moduleName,
}) => {
  // Function to show alert dialog
  const handleChatPress = () => {
    Alert.alert(
      "Assign Module", // Title
      `Would you like to assign the ${moduleName || 'selected module'} to ${name}?`, // Message with module name
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            console.log(`Module Assigned: ${moduleType} to ${name}`);
            Alert.alert(
              "Module Assigned",
              `${moduleName || 'Module'} has been successfully assigned to ${name}.`
            );
          }
        }, // Handle Yes action
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.profileSection}>
          <Image source={profileImage} style={styles.profileImage} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <RatingStars rating={rating} />
          </View>
        </View>

        <View style={styles.priceDistanceSection}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.distance}>{distance} km</Text>
        </View>

        <View style={styles.chatSection}>
          <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
            <Icon name="chatbox-ellipses-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.days}>Days: {days}</Text>
        </View>
      </View>
    </View>
  );
};

export default ManufacturerCard;
