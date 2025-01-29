import React from "react";
import { View, StyleSheet } from "react-native";
import CardComponent from "./src/Screens/exporter/SearchManufacturerList";
import AppNavigator from "./src/Navigations/Navigators/AppNavigator";

export default function App() {
  return (
    <View style={styles1.container}>
      <AppNavigator />
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
});
