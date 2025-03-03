import React from "react";
import { ScrollView } from "react-native";
import orderList from "../../utils/Data/Orders"; // Ensure this file contains your order data
import OrderCard from "./OrderCard";
import OrderListStyles from "../../Styles/Components/OrderListStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = OrderListStyles(width, height);

const OrderList = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {orderList.map((Order, index) => (
        <OrderCard
          key={index}
          Order={Order}
          onPress={() => navigation.navigate("ModuleCardsList")}
        />
      ))}
    </ScrollView>
  );
};

export default OrderList;
