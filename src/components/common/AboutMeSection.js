import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { createAboutMeSectionStyles } from "../../Styles/Components/AboutMeSectionStyles";

const AboutMeSection = ({ aboutMe, width, height, isEmpty = false }) => {
  const styles = createAboutMeSectionStyles(width, height);

  return (
    <View style={styles.aboutMeSection}>
      <Text style={styles.aboutMeTitle}>About Me</Text>
      {isEmpty ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="person-outline" size={20} color="#999" />
          <Text style={styles.placeholderText}>{aboutMe}</Text>
        </View>
      ) : (
        <Text style={styles.aboutMeText}>{aboutMe}</Text>
      )}
    </View>
  );
};

export default AboutMeSection;
