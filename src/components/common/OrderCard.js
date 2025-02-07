import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import OrderCardStyles from "../../Styles/Components/OrderCardStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = OrderCardStyles(width, height);

const OrderCard = ({ Order, onPress }) => {
  const {
    orderName,
    customerName,
    totalCost,
    priority,
    daysLeft,
    modulesSummary,
  } = Order;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Main Card Content */}
      <View style={styles.cardContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.orderName}>{orderName}</Text>
          <View style={styles.iconsLeft}>
            <TouchableOpacity style={styles.chatIcon}>
              <FontAwesome5 name="comment-alt" size={18} color="#004d66" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <MaterialIcons name="attach-file" size={20} color="#004d66" />
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.details}>
          <Text style={styles.detailText}>Customer Name: {customerName}</Text>
          <View style={styles.row}>
            <Text style={styles.detailText}>Cost: {totalCost} $</Text>
            <Text style={styles.detailText}>
              Priority:{" "}
              <Text style={{ color: priority === "High" ? "red" : "green" }}>
                {priority}
              </Text>
            </Text>
            <Text style={styles.detailText}>
              Modules:{" "}
              {modulesSummary.completed +
                modulesSummary.ongoing +
                modulesSummary.todo}
            </Text>
          </View>

          {/* Progress Section */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              ✅ {modulesSummary.completed} Done &nbsp;&nbsp; 🔄{" "}
              {modulesSummary.ongoing} In Progress &nbsp;&nbsp; ⏳{" "}
              {modulesSummary.todo} To Do
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(modulesSummary.completed / 8) * 100}%`,
                    backgroundColor: "#3cb371",
                  },
                ]}
              />
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(modulesSummary.ongoing / 8) * 100}%`,
                    backgroundColor: "#ffcc00",
                  },
                ]}
              />
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(modulesSummary.todo / 8) * 100}%`,
                    backgroundColor: "#cccccc",
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.daysLeft}>{daysLeft} days left</Text>
        </View>
      </View>

      {/* Right Side Bar */}
      <View style={styles.rightBar}>
        <MaterialIcons
          name="chevron-right"
          size={18}
          color="#ffffff"
          style={styles.arrowIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
