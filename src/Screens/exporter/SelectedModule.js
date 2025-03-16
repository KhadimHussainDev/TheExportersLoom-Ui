import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import SelectedModuleStyles from "../../Styles/Screens/Exporter/SelectedModuleStyles";
import { bidService } from "../../services/bidService";
import { MODULE_DESCRIPTIONS } from "../../utils/Data/moduleDescriptions";
import { MODULE_TYPES, STORAGE_KEYS } from "../../utils/contants/constants";

const { width, height } = Dimensions.get("window");
const styles = SelectedModuleStyles(width, height);

const SelectedModule = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract params from navigation
  const {
    projectId,
    moduleId,
    moduleType,
    moduleName,
    projectName,
    projectDetails
  } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [moduleInfo, setModuleInfo] = useState({
    description: getDefaultDescription(moduleType, projectDetails),
    price: getModulePrice(moduleType, projectDetails),
  });

  // Get user data from AsyncStorage
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    getUserData();
  }, []);

  // Helper function to get default description based on module type
  function getDefaultDescription(type, projectDetails) {
    if (!type || !projectDetails) return "";

    switch (type.toLowerCase()) {
      case 'fabricprice':
        if (projectDetails.fabricCategory && projectDetails.fabricSubCategory) {
          return MODULE_DESCRIPTIONS.fabric(
            projectDetails.fabricCategory,
            projectDetails.fabricSubCategory
          );
        }
        return "Fabric pricing module";

      case 'cutting':
        if (projectDetails.cuttingStyle) {
          return MODULE_DESCRIPTIONS.cutting(projectDetails.cuttingStyle);
        }
        return "Cutting module";

      case 'logoprinting':
        if (projectDetails.logoDetails && projectDetails.logoDetails.length > 0) {
          return MODULE_DESCRIPTIONS.logoPrinting(
            projectDetails.logoDetails[0].printingStyle,
            projectDetails.logoDetails[0].logoPosition
          );
        }
        return "Logo printing module";

      case 'stitching':
        const quantity = projectDetails.sizes?.reduce((sum, size) => sum + parseInt(size.quantity), 0) || 0;
        return MODULE_DESCRIPTIONS.stitching(quantity);

      case 'packaging':
        return MODULE_DESCRIPTIONS.packaging(projectDetails.packagingType);

      default:
        return `${type} module`;
    }
  }

  // Helper function to get module price
  function getModulePrice(type, projectDetails) {
    if (!type || !projectDetails) return "";

    switch (type.toLowerCase()) {
      case 'fabricprice':
        const fabricModule = projectDetails.fabricPriceModules?.[0];
        return fabricModule?.price || "";

      case 'cutting':
        const cuttingModule = projectDetails.cuttings?.[0];
        return cuttingModule?.cost || "";

      case 'logoprinting':
        const logoModule = projectDetails.logoPrintingModules?.[0];
        return logoModule?.price || "";

      case 'stitching':
        const stitchingModule = projectDetails.stitchingModules?.[0];
        return stitchingModule?.cost || "";

      case 'packaging':
        const packagingModule = projectDetails.packagingModules?.[0];
        return packagingModule?.cost || "";

      default:
        return "";
    }
  }

  // Helper function to map frontend module type to backend module type
  function mapModuleType(frontendType) {
    if (!frontendType) return "";

    switch (frontendType.toLowerCase()) {
      case 'fabricprice':
        return MODULE_TYPES.FABRIC_PRICING;
      case 'cutting':
        return MODULE_TYPES.CUTTING;
      case 'logoprinting':
        return MODULE_TYPES.LOGO_PRINTING;
      case 'stitching':
        return MODULE_TYPES.STITCHING;
      case 'packaging':
        return MODULE_TYPES.PACKAGING;
      default:
        return frontendType;
    }
  }

  // Navigate to ExporterDashboard
  const navigateToExporterDashboard = () => {
    // Navigate to the root ExporterDashboard screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'ExporterDashboardStack' }],
    });
  };

  // Handle posting the module as a bid
  const handlePostModule = async () => {
    if (!moduleId) {
      Alert.alert("Error", "Module ID is missing");
      return;
    }

    if (!moduleType) {
      Alert.alert("Error", "Module type is missing");
      return;
    }

    setIsLoading(true);

    try {
      const backendModuleType = mapModuleType(moduleType);
      console.log(`Posting module as bid: ${backendModuleType} with ID ${moduleId}`);

      const response = await bidService.postModuleAsBid(backendModuleType, moduleId);

      if (response.success) {
        Alert.alert(
          "Success",
          "Module has been posted as a bid successfully!",
          [
            {
              text: "OK",
              onPress: navigateToExporterDashboard
            }
          ]
        );
      } else {
        Alert.alert("Error", response.message || "Failed to post module as bid");
      }
    } catch (error) {
      console.error("Error posting module as bid:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Module Details</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.moduleInfoContainer}>
          <Text style={styles.moduleTitle}>{moduleName}</Text>
          <Text style={styles.projectName}>Project: {projectName}</Text>

          <View style={styles.moduleDetailsCard}>
            <Text style={styles.sectionTitle}>Module Information</Text>
            <Text style={styles.detailText}>Type: {moduleType}</Text>
            <Text style={styles.detailText}>ID: {moduleId}</Text>
            {getModuleSpecificDetails(moduleType, projectDetails)}
          </View>

          <View style={styles.bidFormContainer}>
            <Text style={styles.sectionTitle}>Post Module as Bid</Text>
            <Text style={styles.infoText}>
              Posting this module will make it available for manufacturers to bid on.
              The module's status will be updated to "Posted".
            </Text>

            <Text style={styles.descriptionText}>
              {moduleInfo.description}
            </Text>

            <Text style={styles.priceText}>
              Price: PKR {parseFloat(moduleInfo.price).toFixed(2)}
            </Text>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handlePostModule}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Post Module as Bid</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Helper function to render module-specific details
function getModuleSpecificDetails(type, projectDetails) {
  if (!type || !projectDetails) return null;

  switch (type.toLowerCase()) {
    case 'fabricprice':
      return (
        <>
          <Text style={styles.detailText}>Category: {projectDetails.fabricCategory}</Text>
          <Text style={styles.detailText}>Sub-Category: {projectDetails.fabricSubCategory}</Text>
          {projectDetails.fabricPriceModules?.[0]?.price && (
            <Text style={styles.detailText}>Price: PKR {parseFloat(projectDetails.fabricPriceModules[0].price).toFixed(2)}</Text>
          )}
        </>
      );

    case 'cutting':
      return (
        <>
          <Text style={styles.detailText}>Style: {projectDetails.cuttingStyle}</Text>
          {projectDetails.cuttings?.[0]?.ratePerShirt && (
            <Text style={styles.detailText}>Rate Per Shirt: PKR {parseFloat(projectDetails.cuttings[0].ratePerShirt).toFixed(2)}</Text>
          )}
          {projectDetails.cuttings?.[0]?.cost && (
            <Text style={styles.detailText}>Total Cost: PKR {parseFloat(projectDetails.cuttings[0].cost).toFixed(2)}</Text>
          )}
        </>
      );

    case 'logoprinting':
      return (
        <>
          <Text style={styles.detailText}>Number of Logos: {projectDetails.numberOfLogos}</Text>
          {projectDetails.logoDetails && projectDetails.logoDetails.length > 0 && (
            <>
              <Text style={styles.detailText}>Position: {projectDetails.logoDetails[0].logoPosition}</Text>
              <Text style={styles.detailText}>Style: {projectDetails.logoDetails[0].printingStyle}</Text>
            </>
          )}
          {projectDetails.logoPrintingModules?.[0]?.price && (
            <Text style={styles.detailText}>Price: PKR {parseFloat(projectDetails.logoPrintingModules[0].price).toFixed(2)}</Text>
          )}
        </>
      );

    case 'stitching':
      return (
        <>
          {projectDetails.sizes && (
            <Text style={styles.detailText}>
              Sizes: {projectDetails.sizes.map(s => `${s.size} (${s.quantity})`).join(', ')}
            </Text>
          )}
          {projectDetails.stitchingModules?.[0]?.ratePerShirt && (
            <Text style={styles.detailText}>Rate Per Shirt: PKR {parseFloat(projectDetails.stitchingModules[0].ratePerShirt).toFixed(2)}</Text>
          )}
          {projectDetails.stitchingModules?.[0]?.cost && (
            <Text style={styles.detailText}>Total Cost: PKR {parseFloat(projectDetails.stitchingModules[0].cost).toFixed(2)}</Text>
          )}
        </>
      );

    case 'packaging':
      return (
        <>
          <Text style={styles.detailText}>Packaging Required: {projectDetails.packagingRequired ? "Yes" : "No"}</Text>
          <Text style={styles.detailText}>Type: {projectDetails.packagingType || "Standard"}</Text>
          {projectDetails.packagingModules?.[0]?.cost && (
            <Text style={styles.detailText}>Cost: PKR {parseFloat(projectDetails.packagingModules[0].cost).toFixed(2)}</Text>
          )}
        </>
      );

    default:
      return null;
  }
}

export default SelectedModule;
