import React from "react";
import { View, Text, Dimensions } from "react-native";
import ModuleDescriptionStyle from "../../Styles/Components/ModuleDescriptionStyle";

const { width, height } = Dimensions.get("window");
const styles = ModuleDescriptionStyle(width, height);

const ModuleDescription = () => (
  <View style={styles.moduleContainer}>
    <Text style={styles.moduleTitle}>📦 Module Description</Text>
    <View style={styles.moduleContent}>
      <Text style={styles.moduleHeading}>Selected Module</Text>
      <Text style={styles.moduleSubHeading}>Status: Not Assigned</Text>
      <Text style={styles.moduleSubHeading}>Total Cost: 50K</Text>
      <Text style={styles.moduleDetails}>
        Create lorem ipsum — Check your app or web is working for properly with
        different alphabets and character sets. Create Arabic, Hindi, Chinese
        and more, filler text to better test your app or web.
      </Text>
    </View>
  </View>
);

export default ModuleDescription;
