import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileScreen from "./src/Screens/Common/ProfileScreen";

export default function App() {
  return (
    <View style={styles1.container}>
      <ProfileScreen />
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
});
