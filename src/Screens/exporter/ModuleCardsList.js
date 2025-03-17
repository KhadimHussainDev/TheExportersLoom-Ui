import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ModuleCard from "../../components/common/ModulesCard";
import { projectService } from "../../services/projectService";
import ModuleCardsListStyles from "../../Styles/Screens/Exporter/ModuleCardsListStyles";
import ModuleData from "../../utils/Data/ModuleData";

const ModuleCardsList = () => {
  const { width, height } = Dimensions.get("window");
  const styles = ModuleCardsListStyles(width, height);
  const navigation = useNavigation();
  const route = useRoute();

  // Log route params for debugging
  // console.log("ModuleCardsList route params:", route.params.project);

  // Extract params from navigation or use defaults
  const {
    projectId,
    projectName = "Unnamed Project",
    projectStatus = "Draft",
    projectBudget = 0,
    fromScreen = "Projects"
  } = route.params.project || {};

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [modules, setModules] = useState([]);

  // Prepare initial project data from navigation params
  const prepareInitialProjectData = () => {
    if (projectId && projectName) {
      const initialData = {
        id: projectId,
        name: projectName,
        status: projectStatus,
        totalEstimatedCost: projectBudget,
      };
      setProject(initialData);
      return initialData;
    }
    return null;
  };

  useEffect(() => {
    // Set initial project data
    const initialProject = prepareInitialProjectData();
    // Fetch complete project details
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Log the projectId we're fetching
        // console.log(`Fetching project with ID: ${projectId}`);

        if (!projectId) {
          throw new Error("Project ID is missing");
        }

        const response = await projectService.getProjectById(projectId);
        // console.log("Project API response:", JSON.stringify(response, null, 2));

        if (response?.data) {
          setProject(response.data);

          // Extract and combine all module types
          const allModules = [];

          // Check each module type array and add to allModules if exists
          if (response.data.fabricPriceModules && response.data.fabricPriceModules.length > 0) {
            // console.log(`Found ${response.data.fabricPriceModules.length} fabric price modules`);
            allModules.push(...response.data.fabricPriceModules.map(m => ({
              ...m,
              type: 'fabricPrice',
              name: `${m.category} - ${m.subCategory}`,
              cost: m.price
            })));
          }

          if (response.data.cuttings && response.data.cuttings.length > 0) {
            // console.log(`Found ${response.data.cuttings.length} cutting modules`);
            allModules.push(...response.data.cuttings.map(m => ({
              ...m,
              type: 'cutting',
              name: `Cutting (${m.cuttingStyle})`,
              cost: m.cost
            })));
          }

          if (response.data.logoPrintingModules && response.data.logoPrintingModules.length > 0) {
            // console.log(`Found ${response.data.logoPrintingModules.length} logo printing modules`);
            allModules.push(...response.data.logoPrintingModules.map(m => ({
              ...m,
              type: 'logoPrinting',
              name: `Logo Printing`,
              cost: m.price
            })));
          }

          if (response.data.stitchingModules && response.data.stitchingModules.length > 0) {
            // console.log(`Found ${response.data.stitchingModules.length} stitching modules`);
            allModules.push(...response.data.stitchingModules.map(m => ({
              ...m,
              type: 'stitching',
              name: `Stitching`,
              cost: m.cost
            })));
          }

          if (response.data.packagingModules && response.data.packagingModules.length > 0) {
            // console.log(`Found ${response.data.packagingModules.length} packaging modules`);
            allModules.push(...response.data.packagingModules.map(m => ({
              ...m,
              type: 'packaging',
              name: `Packaging`,
              cost: m.cost
            })));
          }

          // Note: We're not displaying fabricQuantities modules as requested

          // If no modules found, use ModuleData as default modules
          if (allModules.length === 0) {
            // console.log("No modules found in API response, using ModuleData as default modules");

            // Map ModuleData to our expected format
            const defaultModules = ModuleData.map(module => ({
              ...module,
              type: module.leadingText.split(':')[1].trim().toLowerCase(),
              name: module.middleText,
              cost: module.cost
            }));

            setModules(defaultModules);
          } else {
            // console.log(`Setting ${allModules.length} total modules`);
            setModules(allModules);
          }
        } else {
          throw new Error("Invalid project data received");
        }
      } catch (err) {
        console.error("Error fetching project:", err.message);
        setError(`Failed to load project: ${err.message}`);

        // Use ModuleData as default modules if we have an error
        const defaultModules = ModuleData.map(module => ({
          ...module,
          type: module.leadingText.split(':')[1].trim().toLowerCase(),
          name: module.middleText,
          cost: module.cost
        }));

        setModules(defaultModules);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "PKR 0.00";
    return `PKR ${parseFloat(amount).toFixed(2)}`;
  };

  const handleModulePress = (module) => {
    // console.log("Module pressed:", module);
    navigation.navigate("SelectedModule", {
      projectId,
      moduleId: module.id,
      moduleType: module.type,
      moduleName: module.name,
      moduleStatus: module.status,
      projectName: project?.name || projectName,
      projectDetails: project
    });
  };

  const renderModuleItem = ({ item }) => (
    <ModuleCard
      data={item}
      onPress={() => handleModulePress(item)}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#f6a018" />
        <Text style={styles.loadingText}>Loading project modules...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Header Bar with Back Button */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Project Details Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.projectTitle}>{project?.name || projectName}</Text>
        <Text style={styles.projectCost}>Cost: {formatCurrency(project?.totalEstimatedCost)}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status: </Text>
          <Text style={[
            styles.statusValue,
            {
              color: project?.status?.toLowerCase() === "completed"
                ? '#4CAF50' // Green for completed
                : project?.status?.toLowerCase() === "active"
                  ? '#FF9800' // Orange for active
                  : '#2196F3' // Blue for others
            }
          ]}>
            {project?.status || "Draft"}
          </Text>
        </View>
        {project && (
          <View style={styles.projectDetailsContainer}>
            <Text style={styles.detailText}>Shirt Type: {project.shirtType || "N/A"}</Text>
            <Text style={styles.detailText}>Fabric: {project.fabricCategory} - {project.fabricSubCategory}</Text>
            <Text style={styles.detailText}>Cutting Style: {project.cuttingStyle || "N/A"}</Text>
            <Text style={styles.detailText}>Labels Required: {project.labelsRequired ? "Yes" : "No"}</Text>
            <Text style={styles.detailText}>Packaging Required: {project.packagingRequired ? "Yes" : "No"}</Text>
            <Text style={styles.detailText}>Number of Logos: {project.numberOfLogos || 0}</Text>
          </View>
        )}
      </View>

      {/* Modules Section */}
      <View style={styles.contentContainer}>
        {modules.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>No modules found for this project</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {modules.map((module) => (
              <ModuleCard
                key={module.id || `${module.type}-${Math.random()}`}
                data={module}
                onPress={() => handleModulePress(module)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ModuleCardsList;
