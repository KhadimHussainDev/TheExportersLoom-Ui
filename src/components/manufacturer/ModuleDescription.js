import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import ModuleDescriptionStyle from "../../Styles/Components/ModuleDescriptionStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = ModuleDescriptionStyle(width, height);

const BidDescription = ({ bidTitle, bidDescription, bidPrice, moduleType }) => {
  const formattedPrice = bidPrice ? parseFloat(bidPrice).toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="gavel" size={24} color="#4a90e2" />
        <Text style={styles.headerText}>Bid Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{bidTitle || 'No Title'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Module Type:</Text>
          <Text style={styles.value}>{moduleType || 'Not Specified'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.priceValue}>PKR {formattedPrice}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{bidDescription || 'No Description'}</Text>
        </View>
      </View>
    </View>
  );
};

export default BidDescription;
