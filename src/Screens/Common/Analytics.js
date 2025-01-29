import React from "react";
import { View, Text } from "react-native";
import OrderSummaryCircle from "../../components/common/OrderSummaryCircle";
import SummaryOverview from "../../components/common/SummaryOverview";
import OrderList from "../../components/common/OrderList";
import Analyticstyles from "../../Styles/Screens/Analyticstyles";

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = Analyticstyles(width, height);

const Analytics = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <OrderSummaryCircle />
        <SummaryOverview />
      </View>
      {/* Pass navigation prop to OrderList */}
      <OrderList navigation={navigation} />
      <View style={styles.textRow}>
        <Text>Notifications</Text>
      </View>
    </View>
  );
};

export default Analytics;
