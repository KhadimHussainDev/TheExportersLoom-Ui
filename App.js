import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import RequirementForm from "./src/Screens/None";
import SamplePage from "./src/Screens/issueSolved";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <RequirementForm /> */}
      <SamplePage/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
