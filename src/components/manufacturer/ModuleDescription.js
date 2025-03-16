import React from "react";
import { Text, View } from "react-native";
import ModuleDescriptionStyle from "../../Styles/Components/ModuleDescriptionStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = ModuleDescriptionStyle(width, height);

const ModuleDescription = ({ moduleName, moduleDescription, modulePrice, moduleType }) => (
  <View style={styles.moduleContainer}>
    <Text style={styles.moduleTitle}>📦 Module Description</Text>
    <View style={styles.moduleContent}>
      <Text style={styles.moduleHeading}>{moduleName || 'Selected Module'}</Text>
      <Text style={styles.moduleSubHeading}>Type: {moduleType || 'Not Specified'}</Text>
      <Text style={styles.moduleSubHeading}>Status: Not Assigned</Text>
      <Text style={styles.moduleSubHeading}>Total Cost: PKR {modulePrice ? modulePrice.toFixed(2) : '0.00'}</Text>
      <Text style={styles.moduleDetails}>
        {moduleDescription || 'No description available for this module.'}
      </Text>
    </View>
  </View>
);

export default ModuleDescription;
