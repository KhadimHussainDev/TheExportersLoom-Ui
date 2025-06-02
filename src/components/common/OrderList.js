import React from "react";
import { ScrollView, Text, View } from "react-native";
import OrderListStyles from "../../Styles/Components/OrderListStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import OrderCard from "./OrderCard";

const { width, height } = getWindowDimensions();

const styles = OrderListStyles(width, height);

const OrderList = ({ orders = [], navigation }) => {
  if (!orders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No orders found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {orders.map((order, index) => {
        // Process order data to ensure all required fields are available
        const processedOrder = {
          ...order,
          orderId: order.orderId || order.id || `Order-${index}`,
          exporterName: order.exporterName || (order.exporter && order.exporter.name) || "Unknown Customer",
          exporterId: order.exporterId || (order.exporter && order.exporter.user_id),
        };
        
        // Navigate to order details when clicking on the card
        const handleOrderPress = () => {
          navigation.navigate("ModuleCardsList", { orderId: processedOrder.orderId });
        };
        
        return (
          <OrderCard
            key={processedOrder.orderId || index}
            Order={processedOrder}
            onPress={handleOrderPress}
          />
        );
      })}
    </ScrollView>
  );
};

export default OrderList;
