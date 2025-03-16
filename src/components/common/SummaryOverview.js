import React from "react";
import { Text, View } from "react-native";
import summaryOverviewStyles from "../../Styles/Components/summaryOverviewStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = summaryOverviewStyles(width, height);

const SummaryOverview = ({ statistics }) => {
  // Default values if statistics are not provided
  const defaultStats = {
    completedPercentage: 0,
    ongoingPercentage: 0,
    todoPercentage: 0
  };

  // Use provided statistics or defaults
  const { completedPercentage, ongoingPercentage, todoPercentage } =
    statistics || defaultStats;

  return (
    <View style={styles.summaryOverview}>
      <View style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: "#011627" }]} />
        <Text style={styles.legendText}>
          {completedPercentage.toFixed(1)}% Done
        </Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: "#F6A018" }]} />
        <Text style={styles.legendText}>
          {ongoingPercentage.toFixed(1)}% Ongoing
        </Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: "#B3F0FF" }]} />
        <Text style={styles.legendText}>
          {todoPercentage.toFixed(1)}% To Do
        </Text>
      </View>
    </View>
  );
};

export default SummaryOverview;
