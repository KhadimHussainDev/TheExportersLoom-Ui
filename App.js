import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ExporterRequestList from "./src/Screens/manufacturer/ExporterRequestList";
import ManufacturerRegistration from "./src/Screens/manufacturer/MachineRegisteration"; // Adjust the path accordingly
import AppNavigator from "./src/Navigations/Navigators/AppNavigator";

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E2FDFF",
  },
});

export default App;
