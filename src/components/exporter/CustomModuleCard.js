import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import getWindowDimensions from "../../utils/helpers/dimensions";
import CustomModuleCardStyles from "../../Styles/Components/CustomModuleCardStyles";

const { width, height } = getWindowDimensions();

const styles = CustomModuleCardStyles(width, height);

const CustomModuleCard = ({ image, leadingText, trailingText, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.leadingText}>{leadingText}</Text>
        <Text style={styles.trailingText}>{trailingText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomModuleCard;
