import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { calculateOrderSummary } from "../../utils/helpers/orderUtils";
import orderSummaryCircleStyles from "../../Styles/Components/orderSummaryCircleStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = orderSummaryCircleStyles(width, height);

const OrderSummaryCircle = () => {
  const { completedPercentage, ongoingPercentage, todoPercentage, total } =
    calculateOrderSummary();

  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const completedStroke = (completedPercentage / 100) * circleCircumference;
  const ongoingStroke = (ongoingPercentage / 100) * circleCircumference;
  const todoStroke = (todoPercentage / 100) * circleCircumference;

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
      <Text style={styles.circleSubtitle}>Total Modules</Text>
    </View>
  );
};

export default OrderSummaryCircle;
