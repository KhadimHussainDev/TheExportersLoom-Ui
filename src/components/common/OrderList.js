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
      {orders.map((order, index) => (
        <OrderCard
          key={order.id || index}
          Order={order}
          onPress={() => navigation.navigate("ModuleCardsList", { orderId: order.id })}
        />
      ))}
    </ScrollView>
  );
};

export default OrderList;
