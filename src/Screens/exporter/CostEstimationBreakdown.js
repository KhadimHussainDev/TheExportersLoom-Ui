import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import SelectedModule from "./SelectedModule";
import CustomModuleCard from "../../components/exporter/CustomModuleCard";
import ModuleData from "../../utils/Data/ModuleData";
import CostEstimationBreakdownStyles from "../../Styles/Screens/Exporter/CostEstimationBreakdownStyles";

const CostEstimationBreakdown = ({ navigation }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  const totalCost = ModuleData.reduce((sum, item) => sum + item.cost, 0);

  const renderItem = ({ item }) => (
    <CustomModuleCard
      image={item.image}
      leadingText={item.leadingText}
      trailingText={item.trailingText}
      onPress={() => navigation.navigate("ManufacturerSelection")}
    />
  );

  return (
    <View style={CostEstimationBreakdownStyles.container}>
      {selectedModule ? (
        <SelectedModule
          moduleName={selectedModule}
          onGoBack={() => navigation.navigate("CostEstimationBreakdown")}
        />
      ) : (
        <>
          <Text style={CostEstimationBreakdownStyles.header}>
            Production Modules Section
          </Text>
          <FlatList
            data={ModuleData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={CostEstimationBreakdownStyles.listContent}
          />
          <Text style={CostEstimationBreakdownStyles.header}>
            Total Estimated Cost Section
          </Text>
          <View style={CostEstimationBreakdownStyles.summaryContainer}>
            <Text style={CostEstimationBreakdownStyles.summaryText}>
              Total Production Cost
            </Text>
            <Text style={CostEstimationBreakdownStyles.summaryCost}>
              ${totalCost}
            </Text>
          </View>
          <TouchableOpacity
            style={CostEstimationBreakdownStyles.buttonCalculateCost}
            onPress={() => navigation.navigate("MockupDetailsGathering")}
          >
            <Text style={CostEstimationBreakdownStyles.buttonTextculateCost}>
              Recaclulate Cost
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CostEstimationBreakdown;
