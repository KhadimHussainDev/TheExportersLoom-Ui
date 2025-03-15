import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomModuleCardStyles from "../../Styles/Components/CustomModuleCardStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = CustomModuleCardStyles(width, height);

const CustomModuleCard = ({ image, leadingText, trailingText, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.leadingText}>{leadingText}</Text>
        <Text style={styles.trailingText}>{trailingText}</Text>
        {description && <Text style={styles.descriptionText}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default CustomModuleCard;
