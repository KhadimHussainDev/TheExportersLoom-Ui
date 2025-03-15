import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import CustomModuleCard from "../../components/exporter/CustomModuleCard";
import CostEstimationBreakdownStyles from "../../Styles/Screens/Exporter/CostEstimationBreakdownStyles";
import { IMAGES } from "../../utils/contants/images";
import { MODULE_DESCRIPTIONS } from "../../utils/Data/moduleDescriptions";
import SelectedModule from "./SelectedModule";

const CostEstimationBreakdown = ({ navigation, route }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    // Get project data from route params
    if (route.params?.data) {
      setProjectData(route.params.data);

      // Transform project data into module format
      const modules = [];

      // Add Fabric Module
      if (route.params.data.fabricPriceModules && route.params.data.fabricPriceModules.length > 0) {
        modules.push({
          id: 'fabric',
          leadingText: 'Fabric Module',
          trailingText: `PKR ${route.params.data.fabricPriceModules[0].price}`,
          cost: parseFloat(route.params.data.fabricPriceModules[0].price),
          description: MODULE_DESCRIPTIONS.fabric(
            route.params.data.fabricCategory,
            route.params.data.fabricSubCategory
          ),
          details: route.params.data.fabricPriceModules,
          image: IMAGES.Fabric
        });
      }

      // Add Cutting Module
      if (route.params.data.cuttings && route.params.data.cuttings.length > 0) {
        modules.push({
          id: 'cutting',
          leadingText: 'Cutting Module',
          trailingText: `PKR ${route.params.data.cuttings[0].cost}`,
          cost: parseFloat(route.params.data.cuttings[0].cost),
          description: MODULE_DESCRIPTIONS.cutting(route.params.data.cuttingStyle || 'standard'),
          details: route.params.data.cuttings,
          image: IMAGES.Cutting
        });
      }

      // Add Stitching Module
      if (route.params.data.stitchingModules && route.params.data.stitchingModules.length > 0) {
        const totalQuantity = route.params.data.sizes.reduce((sum, size) => sum + size.quantity, 0);
        modules.push({
          id: 'stitching',
          leadingText: 'Stitching Module',
          trailingText: `PKR ${route.params.data.stitchingModules[0].cost}`,
          cost: parseFloat(route.params.data.stitchingModules[0].cost),
          description: MODULE_DESCRIPTIONS.stitching(totalQuantity),
          details: route.params.data.stitchingModules,
          image: IMAGES.Stitching
        });
      }

      // Add Logo Printing Module
      if (route.params.data.logoPrintingModules && route.params.data.logoPrintingModules.length > 0) {
        const logoDetails = route.params.data.logoDetails && route.params.data.logoDetails.length > 0
          ? route.params.data.logoDetails[0]
          : { printingStyle: 'standard', logoPosition: 'front' };

        modules.push({
          id: 'logoPrinting',
          leadingText: 'Logo Printing Module',
          trailingText: `PKR ${route.params.data.logoPrintingModules[0].price}`,
          cost: parseFloat(route.params.data.logoPrintingModules[0].price),
          description: MODULE_DESCRIPTIONS.logoPrinting(
            logoDetails.printingStyle || 'standard',
            logoDetails.logoPosition || 'front'
          ),
          details: route.params.data.logoPrintingModules,
          image: IMAGES.Printing
        });
      }

      // Add Packaging Module (if exists)
      if (route.params.data.packagingModules && route.params.data.packagingModules.length > 0) {
        modules.push({
          id: 'packaging',
          leadingText: 'Packaging Module',
          trailingText: `PKR ${route.params.data.packagingModules[0].cost || '0.00'}`,
          cost: parseFloat(route.params.data.packagingModules[0].cost || 0),
          description: MODULE_DESCRIPTIONS.packaging(route.params.data.packagingType),
          details: route.params.data.packagingModules,
          image: IMAGES.Packaging
        });
      }

      console.log("Modules created:", modules); // Debug log
      setModuleData(modules);
    }
  }, [route.params]);

  // Calculate total cost from the actual project data
  const totalCost = projectData ? parseFloat(projectData.totalEstimatedCost) : 0;

  // Render the project info section
  const renderProjectInfo = () => {
    if (!projectData) return null;

    return (
      <View style={CostEstimationBreakdownStyles.projectInfoContainer}>
        <Text style={CostEstimationBreakdownStyles.projectInfoText}>
          Project ID: {projectData.id}
        </Text>
        <Text style={CostEstimationBreakdownStyles.projectInfoText}>
          Status: {projectData.status}
        </Text>
        <Text style={CostEstimationBreakdownStyles.projectInfoText}>
          Shirt Type: {projectData.shirtType}
        </Text>
        <Text style={CostEstimationBreakdownStyles.projectInfoText}>
          Fabric: {projectData.fabricCategory} - {projectData.fabricSubCategory}
        </Text>
      </View>
    );
  };

  // Render the cost summary section
  const renderCostSummary = () => {
    return (
      <>
        <Text style={CostEstimationBreakdownStyles.header}>
          Total Estimated Cost Section
        </Text>
        <View style={CostEstimationBreakdownStyles.summaryContainer}>
          <Text style={CostEstimationBreakdownStyles.summaryText}>
            Total Production Cost
          </Text>
          <Text style={CostEstimationBreakdownStyles.summaryCost}>
            PKR {totalCost.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={CostEstimationBreakdownStyles.buttonCalculateCost}
          onPress={() => {
            // Extract only the necessary data for updating the project
            const data = {
              projectId: projectData.id,
              isUpdating: true, // This flag indicates we're updating an existing project
              updateExisting: true, // Additional flag to make it very clear this is an update operation
              productType: projectData.shirtType,
              fabricType: projectData.fabricCategory,
              fabricSubType: projectData.fabricSubCategory,
              labelsRequired: projectData.labelsRequired,
              numberOfLogos: projectData.numberOfLogos?.toString() || "0",
              packagingRequired: projectData.packagingRequired,
              packagingType: projectData.packagingType,
              patternRequired: projectData.patternRequired,
              tagCardsRequired: projectData.tagCardsRequired,
              sizes: projectData.sizes?.map(size => ({
                size: size.size,
                quantity: size.quantity.toString()
              })) || [],
              // Transform logoDetails to match the expected format
              logoDetails: projectData.logoDetails?.map(logo => ({
                position: logo.logoPosition,
                type: logo.printingStyle || null
              })) || []
            };

            console.log("Navigating to MockupDetailsGathering for project update, ID:", projectData.id);

            // Navigate back to MockupDetailsGathering with the data for updating
            navigation.navigate("MockupDetailsGathering", {
              data,
              mode: "update", // Additional parameter to indicate update mode
              projectId: projectData.id // Pass project ID directly in route params for easier access
            });
          }}
        >
          <Text style={CostEstimationBreakdownStyles.buttonTextculateCost}>
            Recalculate Cost
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem = ({ item }) => (
    <CustomModuleCard
      image={item.image}
      leadingText={item.leadingText}
      trailingText={item.trailingText}
      description={item.description}
      onPress={() => {
        // Navigate to manufacturer selection with module details
        navigation.navigate("ManufacturerSelection", {
          moduleType: item.id,
          moduleDetails: item.details,
          moduleDescription: item.description
        });
      }}
    />
  );

  // Main render for the content when no module is selected
  const renderContent = () => {
    if (!projectData) {
      return (
        <View style={CostEstimationBreakdownStyles.container}>
          <Text style={CostEstimationBreakdownStyles.header}>
            Production Modules Section
          </Text>
          <Text style={CostEstimationBreakdownStyles.noDataText}>
            No project data available
          </Text>
        </View>
      );
    }

    return (
      <View style={CostEstimationBreakdownStyles.container}>
        <Text style={CostEstimationBreakdownStyles.header}>
          Production Modules Section
        </Text>

        {renderProjectInfo()}

        <FlatList
          data={moduleData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={CostEstimationBreakdownStyles.listContent}
          ListFooterComponent={renderCostSummary}
        />
      </View>
    );
  };

  return (
    <View style={CostEstimationBreakdownStyles.container}>
      {selectedModule ? (
        <SelectedModule
          moduleName={selectedModule}
          onGoBack={() => navigation.navigate("CostEstimationBreakdown")}
        />
      ) : (
        renderContent()
      )}
    </View>
  );
};

export default CostEstimationBreakdown;
