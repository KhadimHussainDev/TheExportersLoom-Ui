import React from "react";
import { View, Text } from "react-native";
import { createAboutMeSectionStyles } from "../../Styles/Components/AboutMeSectionStyles";

const AboutMeSection = ({ aboutMe, width, height }) => {
  const styles = createAboutMeSectionStyles(width, height);
  return (
    <View style={styles.aboutMeSection}>
      <Text style={styles.aboutMeTitle}>About Me</Text>
      <Text style={styles.aboutMeText}>{aboutMe}</Text>
    </View>
  );
};

export default AboutMeSection;
