import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import OrderCardStyles from "../../Styles/Components/OrderCardStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = OrderCardStyles(width, height);

const OrderCard = ({ Order, onPress }) => {
  const {
    orderId = "Unnamed Order",
    exporterName = "Unknown Customer",
    price = 0,
    deadline = new Date(),
    status = "pending",
    completionPercentage = 0
  } = Order || {};

  // Calculate days left until deadline
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const isLate = daysDiff < 0;
  const daysAbsolute = Math.abs(daysDiff);

  // Determine priority based on days difference
  let priority = "Medium";
  if (isLate || daysDiff <= 3) {
    priority = "High";
  } else if (daysDiff >= 10) {
    priority = "Low";
  }

  // Ensure completion percentage is within 0-100 range
  const progress = Math.min(Math.max(completionPercentage, 0), 100);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Main Card Content */}
      <View style={styles.cardContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.orderName}>{orderId}</Text>
          <View style={styles.iconsLeft}>
            <TouchableOpacity style={styles.chatIcon}>
              <FontAwesome5 name="comment-alt" size={18} color="#004d66" />
            </TouchableOpacity>
            <MaterialIcons name="attach-file" size={20} color="#004d66" />
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.details}>
          <Text style={styles.detailText}>Customer: {exporterName}</Text>
          <View style={styles.row}>
            <Text style={styles.detailText}>Cost: PKR {price}</Text>
            <Text style={styles.detailText}>
              Priority:{" "}
              <Text style={{ color: priority === "High" ? "red" : "green" }}>
                {priority}
              </Text>
            </Text>
            <Text style={styles.detailText}>
              Status: {status}
            </Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress}%`,
                  backgroundColor: "#f6a018",
                },
              ]}
            />
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={[styles.daysLeft, isLate ? { color: 'red' } : {}]}>
            {isLate ? `${daysAbsolute} days late` : `${daysAbsolute} days left`}
          </Text>
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
