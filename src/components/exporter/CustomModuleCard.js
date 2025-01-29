import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import CustomModuleCardStyles from "../../Styles/Components/CustomModuleCardStyles";

const CustomModuleCard = ({ image, leadingText, trailingText, onPress }) => {
  return (
    <TouchableOpacity
      style={CustomModuleCardStyles.cardContainer}
      onPress={onPress}
    >
      <Image source={image} style={CustomModuleCardStyles.image} />
      <View style={CustomModuleCardStyles.textContainer}>
        <Text style={CustomModuleCardStyles.leadingText}>{leadingText}</Text>
        <Text style={CustomModuleCardStyles.trailingText}>{trailingText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomModuleCard;
