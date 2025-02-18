import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ExporterRequestList from "./src/Screens/manufacturer/ExporterRequestList";
import ManufacturerRegistration from "./src/Screens/manufacturer/MachineRegisteration"; // Adjust the path accordingly

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ExporterRequestList />
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
