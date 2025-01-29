import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SelectedModuleStyles from "../../Styles/Screens/Exporter/SelectedModuleStyles";

const SelectedModule = ({ moduleName, onGoBack }) => {
  return (
    <View style={SelectedModuleStyles.container}>
      <Text style={SelectedModuleStyles.moduleText}>{moduleName}</Text>
      <TouchableOpacity
        style={SelectedModuleStyles.backButton}
        onPress={onGoBack}
      >
        <Text style={SelectedModuleStyles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectedModule;
