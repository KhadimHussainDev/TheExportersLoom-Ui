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

const ModuleCardsList = () => {
  const { width, height } = Dimensions.get("window");
  const styles = ModuleCardsListStyles(width, height);
  const navigation = useNavigation();
  const route = useRoute();

  // Log route params for debugging
  console.log("ModuleCardsList route params:", JSON.stringify(route.params, null, 2));

  // Extract params from navigation or use defaults
  const {
    projectId,
    projectName = "Unnamed Project",
    projectStatus = "Draft",
    projectBudget = 0,
    fromScreen = "Projects"
  } = route.params || {};

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
        console.log(`Fetching project with ID: ${projectId}`);

        if (!projectId) {
          throw new Error("Project ID is missing");
        }

        const response = await projectService.getProjectById(projectId);
        console.log("Project API response:", JSON.stringify(response, null, 2));

        if (response?.data) {
          setProject(response.data);

          // Extract and combine all module types
          const allModules = [];

          // Check each module type array and add to allModules if exists
          if (response.data.roofingModules && response.data.roofingModules.length > 0) {
            console.log(`Found ${response.data.roofingModules.length} roofing modules`);
            allModules.push(...response.data.roofingModules.map(m => ({ ...m, type: 'roofing' })));
          }

          if (response.data.siteClearingModules && response.data.siteClearingModules.length > 0) {
            console.log(`Found ${response.data.siteClearingModules.length} site clearing modules`);
            allModules.push(...response.data.siteClearingModules.map(m => ({ ...m, type: 'siteClearing' })));
          }

          if (response.data.excavationModules && response.data.excavationModules.length > 0) {
            console.log(`Found ${response.data.excavationModules.length} excavation modules`);
            allModules.push(...response.data.excavationModules.map(m => ({ ...m, type: 'excavation' })));
          }

          if (response.data.pavingModules && response.data.pavingModules.length > 0) {
            console.log(`Found ${response.data.pavingModules.length} paving modules`);
            allModules.push(...response.data.pavingModules.map(m => ({ ...m, type: 'paving' })));
          }

          // If no modules found, create default placeholder modules
          if (allModules.length === 0) {
            console.log("No modules found in API response, creating default modules");

            // Create placeholder modules for each type
            const defaultModules = [
              { id: 'default-roofing', name: 'Roofing Module', type: 'roofing', status: 'Draft', cost: 0 },
              { id: 'default-siteClearing', name: 'Site Clearing Module', type: 'siteClearing', status: 'Draft', cost: 0 },
              { id: 'default-excavation', name: 'Excavation Module', type: 'excavation', status: 'Draft', cost: 0 },
              { id: 'default-paving', name: 'Paving Module', type: 'paving', status: 'Draft', cost: 0 }
            ];

            setModules(defaultModules);
          } else {
            console.log(`Setting ${allModules.length} total modules`);
            setModules(allModules);
          }
        } else {
          throw new Error("Invalid project data received");
        }
      } catch (err) {
        console.error("Error fetching project:", err.message);
        setError(`Failed to load project: ${err.message}`);

        // Create default modules if we have an error
        const defaultModules = [
          { id: 'default-roofing', name: 'Roofing Module', type: 'roofing', status: 'Draft', cost: 0 },
          { id: 'default-siteClearing', name: 'Site Clearing Module', type: 'siteClearing', status: 'Draft', cost: 0 },
          { id: 'default-excavation', name: 'Excavation Module', type: 'excavation', status: 'Draft', cost: 0 },
          { id: 'default-paving', name: 'Paving Module', type: 'paving', status: 'Draft', cost: 0 }
        ];

        setModules(defaultModules);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "$0.00";
    return `$${parseFloat(amount).toFixed(2)} USD`;
  };

  const handleModulePress = (module) => {
    console.log("Module pressed:", module);
    navigation.navigate("SelectedModule", {
      projectId,
      moduleId: module.id,
      moduleType: module.type,
      moduleName: module.name,
      projectName: project?.name || projectName,
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
        <Text style={styles.projectTitle}>{project?.name || "Unnamed Project"}</Text>
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
