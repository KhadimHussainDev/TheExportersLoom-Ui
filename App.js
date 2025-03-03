import React from "react";
import { StyleSheet, View } from "react-native";
import OrderList from "./src/components/common/OrderList";
import AppNavigator from "../ExporterLoom/src/Navigations/Navigators/AppNavigator";

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

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import OrderList from "./src/components/common/OrderList";
// import AppNavigator from "./src/Navigations/Navigators/AppNavigator";

// const App = () => {
//   return <AppNavigator />;
// };

// export default App;
