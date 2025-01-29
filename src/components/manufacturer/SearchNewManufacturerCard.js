import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RatingStars from "../common/RatingStars";
import SearchNewManufacturerCardStyles from "../../Styles/Components/SearchNewManufacturerCardStyles";
const { width, height } = Dimensions.get("window"); // Get screen dimensions
const styles = SearchNewManufacturerCardStyles(width, height);

const SearchNewManufacturerCard = ({ manufacturer, navigation }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={manufacturer.profileImage}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{manufacturer.name}</Text>
            <Text style={styles.location}>
              Location: {manufacturer.location}
            </Text>
          </View>
        </View>
        <Text style={styles.level}>🌟 Level {manufacturer.level}</Text>
      </View>
      <View style={styles.labelsContainer}>
        <View style={styles.labelsRow}>
          {manufacturer.labels.slice(0, 4).map((label, index) => (
            <Text key={index} style={styles.label}>
              {label}
            </Text>
          ))}
        </View>
        <View style={styles.labelsRow}>
          {manufacturer.labels.slice(4, 10).map((label, index) => (
            <Text key={index} style={styles.label}>
              {label}
            </Text>
          ))}
        </View>
      </View>
      <Text style={styles.description}>{manufacturer.about}</Text>
      <RatingStars rating={manufacturer.rating} />
      <View style={styles.chatIconContainer}>
        <MaterialIcons name="chat" size={24} color="#ffffff" />
      </View>
    </View>
  );
};

export default SearchNewManufacturerCard;
