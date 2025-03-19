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
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import SelectedModuleStyles from "../../Styles/Screens/Exporter/SelectedModuleStyles";
import { bidService } from "../../services/bidService";
import { MODULE_DESCRIPTIONS } from "../../utils/Data/moduleDescriptions";
import { MODULE_TYPES, PROJECT_STATUS, STORAGE_KEYS } from "../../utils/contants/constants";

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
    moduleStatus,
    projectName,
    projectDetails
  } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [associatedBid, setAssociatedBid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bidData, setBidData] = useState({
    title: moduleName || "",
    description: getDefaultDescription(moduleType, projectDetails),
    price: getModulePrice(moduleType, projectDetails),
  });

  // Get user data and check for existing bid
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Get user data
        const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }

        // Check if module is already posted as a bid
        if (moduleId) {
          const backendModuleType = mapModuleType(moduleType);
          const response = await bidService.getBidByModuleId(moduleId, backendModuleType);
          if (response.success) {
            setAssociatedBid(response.data);
            setBidData({
              title: response.data.title,
              description: response.data.description,
              price: response.data.price.toString(),
            });
          }
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, [moduleId, moduleType]);

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

  // Handle updating the bid
  const handleUpdateBid = async () => {
    if (!associatedBid?.bid_id) {
      Alert.alert("Error", "No bid found to update");
      return;
    }

    if (!bidData.title.trim() || !bidData.description.trim() || !bidData.price) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isNaN(parseFloat(bidData.price)) || parseFloat(bidData.price) <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    setIsLoading(true);

    try {
      const updateData = {
        title: bidData.title.trim(),
        description: bidData.description.trim(),
        price: parseFloat(bidData.price)
      };

      const response = await bidService.editBid(associatedBid.bid_id, updateData);

      if (response.success) {
        setIsEditing(false);
        Alert.alert(
          "Success",
          "Bid updated successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                // Refresh the bid data
                const fetchBid = async () => {
                  const backendModuleType = mapModuleType(moduleType);
                  const refreshResponse = await bidService.getBidByModuleId(moduleId, backendModuleType);
                  if (refreshResponse.success) {
                    setAssociatedBid(refreshResponse.data);
                    setBidData({
                      title: refreshResponse.data.title,
                      description: refreshResponse.data.description,
                      price: refreshResponse.data.price.toString(),
                    });
                  }
                };
                fetchBid();
              }
            }
          ]
        );
      } else {
        Alert.alert("Error", response.message || "Failed to update bid");
      }
    } catch (error) {
      console.error("Error updating bid:", error);
      Alert.alert("Error", "An unexpected error occurred while updating the bid");
    } finally {
      setIsLoading(false);
    }
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

    if (!bidData.title.trim() || !bidData.description.trim() || !bidData.price) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isNaN(parseFloat(bidData.price)) || parseFloat(bidData.price) <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    setIsLoading(true);

    try {
      const backendModuleType = mapModuleType(moduleType);
      const createBidData = {
        moduleId: moduleId,
        title: bidData.title.trim(),
        description: bidData.description.trim(),
        price: parseFloat(bidData.price),
        moduleType: backendModuleType,
      };

      const response = await bidService.createBid(createBidData);

      if (response.success) {
        Alert.alert(
          "Success",
          "Module has been posted as a bid successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                // Refresh the bid data to show the newly created bid
                const fetchBid = async () => {
                  const refreshResponse = await bidService.getBidByModuleId(moduleId, backendModuleType);
                  if (refreshResponse.success) {
                    setAssociatedBid(refreshResponse.data);
                    setBidData({
                      title: refreshResponse.data.title,
                      description: refreshResponse.data.description,
                      price: refreshResponse.data.price.toString(),
                    });
                  }
                };
                fetchBid();
              }
            }
          ]
        );
      } else {
        Alert.alert("Error", response.message || "Failed to post module as bid");
      }
    } catch (error) {
      console.error("Error posting module as bid:", error);
      Alert.alert("Error", "An unexpected error occurred while posting the bid");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to bid responses
  const navigateToBidResponses = () => {
    if (!associatedBid || !userData) return;

    navigation.navigate('ManufacturerSelection', {
      bidId: associatedBid.bid_id,
      bidTitle: associatedBid.title,
      bidDescription: associatedBid.description,
      bidPrice: parseFloat(associatedBid.price),
      moduleType: moduleType,
      exporterId: userData.user_id
    });
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
            <Text style={styles.sectionTitle}>
              {associatedBid ? 'Posted Bid Details' : 'Post Module as Bid'}
            </Text>

            {associatedBid ? (
              // Show posted bid details with edit option
              <View style={styles.postedBidDetails}>
                {isEditing && associatedBid.status === PROJECT_STATUS.ACTIVE ? (
                  // Edit form - only show if bid is active
                  <View style={styles.bidForm}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                      style={styles.input}
                      value={bidData.title}
                      onChangeText={(text) => setBidData(prev => ({ ...prev, title: text }))}
                      placeholder="Enter bid title"
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={bidData.description}
                      onChangeText={(text) => setBidData(prev => ({ ...prev, description: text }))}
                      placeholder="Enter bid description"
                      multiline
                      numberOfLines={4}
                    />

                    <Text style={styles.label}>Price (PKR)</Text>
                    <TextInput
                      style={styles.input}
                      value={bidData.price}
                      onChangeText={(text) => setBidData(prev => ({ ...prev, price: text }))}
                      keyboardType="numeric"
                      placeholder="Enter price"
                    />

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => {
                          setIsEditing(false);
                          // Reset form data to original bid data
                          setBidData({
                            title: associatedBid.title,
                            description: associatedBid.description,
                            price: associatedBid.price.toString(),
                          });
                        }}
                        disabled={isLoading}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleUpdateBid}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <ActivityIndicator color="#fff" size="small" />
                        ) : (
                          <Text style={styles.buttonText}>Save Changes</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  // View mode
                  <>
                    <Text style={styles.detailText}>Title: {bidData.title}</Text>
                    <Text style={styles.detailText}>Description: {bidData.description}</Text>
                    <Text style={styles.detailText}>Price: PKR {parseFloat(bidData.price).toFixed(2)}</Text>
                    <Text style={[styles.detailText, associatedBid.status === PROJECT_STATUS.INACTIVE && styles.inactiveText]}>
                      Status: {associatedBid.status === PROJECT_STATUS.ACTIVE ? 'Active' : 'inActive'}
                    </Text>

                    {associatedBid.status === PROJECT_STATUS.ACTIVE && (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={[styles.button, styles.editButton]}
                          onPress={() => setIsEditing(true)}
                        >
                          <Text style={styles.buttonText}>Edit Bid</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.button, styles.viewResponsesButton]}
                          onPress={navigateToBidResponses}
                        >
                          <Text style={styles.buttonText}>View Responses</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
            ) : (
              // Show bid creation form
              <View style={styles.bidForm}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  value={bidData.title}
                  onChangeText={(text) => setBidData(prev => ({ ...prev, title: text }))}
                  placeholder="Enter bid title"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={bidData.description}
                  onChangeText={(text) => setBidData(prev => ({ ...prev, description: text }))}
                  placeholder="Enter bid description"
                  multiline
                  numberOfLines={4}
                />

                <Text style={styles.label}>Price (PKR)</Text>
                <TextInput
                  style={styles.input}
                  value={bidData.price}
                  onChangeText={(text) => setBidData(prev => ({ ...prev, price: text }))}
                  keyboardType="numeric"
                  placeholder="Enter price"
                />

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handlePostModule}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.submitButtonText}>Post Module as Bid</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
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
