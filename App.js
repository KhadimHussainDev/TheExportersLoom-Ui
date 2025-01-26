// import React from "react";
// import { StyleSheet, View } from "react-native";
// import ModuleCardsList from "./src/Screens/exporter/ModuleCardsList";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <ModuleCardsList />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// App.js
import React from "react";
import { StyleSheet, View } from "react-native";
import OrderList from "./src/components/common/OrderList";
import AppNavigator from "../ExporterLoom/src/Navigations/Navigators/AppNavigator";

const App = () => {
  return <AppNavigator />;
};

export default App;
