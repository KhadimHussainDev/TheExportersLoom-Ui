import React from "react";
import { ScrollView, Text, View } from "react-native";
import OrderListStyles from "../../Styles/Components/OrderListStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import ProjectCard from "./ProjectCard";

const { width, height } = getWindowDimensions();

const styles = OrderListStyles(width, height);

const ProjectList = ({ projects = [], navigation }) => {
  console.log("ProjectList - Available projects:", projects.length);

  const handleProjectPress = (project) => {
    // console.log("Navigating to ModuleCardsList with project:", project.id, project.name);
    navigation.navigate("ModuleCardsList", {
      project: {
        projectId: project.id,
        projectName: project.name,
        projectStatus: project.status,
        projectBudget: project.budget,
        fromScreen: "Analytics"
      }
    });
  };

  if (!projects || projects.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No projects found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id || index}
          project={project}
          onPress={() => handleProjectPress(project)}
        />
      ))}
    </ScrollView>
  );
};

export default ProjectList;