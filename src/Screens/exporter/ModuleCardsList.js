import React from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";
import ModuleCard from "../../components/common/ModulesCard";
import ModuleData from "../../utils/Data/ModuleData";
import ModuleCardsListStyles from "../../Styles/Screens/Exporter/ModuleCardsListStyles";

const { width, height } = Dimensions.get("window");
const styles = ModuleCardsListStyles(width, height); // Get dynamic styles // Get screen width and height

const ModuleCardsList = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Top Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Good Morning, Khadim</Text>
        <Text style={styles.projectTitle}>Summer Jacket Project</Text>
        <Text style={styles.projectCost}>Cost: 505 USD</Text>
      </View>

      {/* Rounded Container for Modules */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {ModuleData.map((module) => (
            <ModuleCard key={module.id} data={module} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ModuleCardsList;
