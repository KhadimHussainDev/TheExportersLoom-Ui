import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import orderSummaryCircleStyles from "../../Styles/Components/orderSummaryCircleStyles";
import { ROLES } from "../../utils/contants/constants";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = orderSummaryCircleStyles(width, height);

const OrderSummaryCircle = ({ statistics, userType }) => {
  // Default values if statistics are not provided
  const defaultStats = {
    completedPercentage: 0,
    ongoingPercentage: 0,
    todoPercentage: 0,
    total: 0,
    completed: 0,
    ongoing: 0,
    todo: 0
  };

  // Use provided statistics or defaults
  const { completedPercentage, ongoingPercentage, todoPercentage, total } =
    statistics || defaultStats;

  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const completedStroke = (completedPercentage / 100) * circleCircumference;
  const ongoingStroke = (ongoingPercentage / 100) * circleCircumference;
  const todoStroke = (todoPercentage / 100) * circleCircumference;

  // Determine title based on user type
  const isExporter = userType === ROLES.EXPORTER;
  const title = isExporter ? "Total Modules" : "Total Orders";

  return (
    <View style={styles.circleContainer}>
      <Svg height="120" width="120">
        <G rotation="-90" origin="60, 60">
          <Circle
            cx="60"
            cy="60"
            r={circleRadius}
            stroke="#011627"
            strokeWidth="10"
            strokeDasharray={`${completedStroke}, ${circleCircumference}`}
            fill="none"
          />
          <Circle
            cx="60"
            cy="60"
            r={circleRadius}
            stroke="#F6A018"
            strokeWidth="10"
            strokeDasharray={`${ongoingStroke}, ${circleCircumference}`}
            strokeDashoffset={-completedStroke}
            fill="none"
          />
          <Circle
            cx="60"
            cy="60"
            r={circleRadius}
            stroke="#B3F0FF"
            strokeWidth="10"
            strokeDasharray={`${todoStroke}, ${circleCircumference}`}
            strokeDashoffset={-(completedStroke + ongoingStroke)}
            fill="none"
          />
        </G>
      </Svg>
      <Text style={styles.circleText}>{total}</Text>
      <Text style={styles.circleSubtitle}>{title}</Text>
    </View>
  );
};

export default OrderSummaryCircle;
