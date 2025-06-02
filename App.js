import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ExporterRequestList from "./src/Screens/manufacturer/ExporterRequestList";
import ManufacturerRegistration from "./src/Screens/manufacturer/MachineRegisteration"; // Adjust the path accordingly
import AppNavigator from "./src/Navigations/Navigators/AppNavigator";
import { NotificationProvider } from "./src/context/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <SafeAreaView style={styles.wrapper}>
        <AppNavigator />
      </SafeAreaView>
    </NotificationProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E2FDFF",
  },
});

export default App;

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import OrderList from "./src/components/common/OrderList";
// import AppNavigator from "./src/Navigations/Navigators/AppNavigator";

// const App = () => {
//   return <AppNavigator />;
// };

// export default App;
