import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import ModuleCardStyles from "../../Styles/Components/ModuleCardStyles";
import { colors } from "../../Styles/Themes/colors";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const styles = ModuleCardStyles(width, height);

const ModuleCard = ({ data, onPress }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  // Handle external click
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      handleToggle();
    }
  };

  // Determine background color based on module status
  const getBackgroundColor = (status) => {
    if (!status) return colors.lightBackground; // Default

    const statusLower = status.toLowerCase();
    if (statusLower.includes("completed") || statusLower.includes("done")) {
      return "rgba(76, 175, 80, 0.1)"; // Light green
    } else if (statusLower.includes("active") || statusLower.includes("in progress")) {
      return "rgba(255, 152, 0, 0.1)"; // Light orange
    } else if (statusLower.includes("todo") || statusLower.includes("pending")) {
      return "rgba(33, 150, 243, 0.1)"; // Light blue
    } else if (statusLower.includes("draft")) {
      return "rgba(158, 158, 158, 0.1)"; // Light gray
    }
    return colors.lightBackground;
  };

  // Format cost with fallback
  const formatCost = (cost) => {
    if (cost === undefined || cost === null || isNaN(parseFloat(cost))) {
      return "$0.00";
    }
    return `$${parseFloat(cost).toFixed(2)}`;
  };

  // Calculate progress percentage (0-100)
  const calculateProgress = (status) => {
    if (!status) return 0;

    const statusLower = status.toLowerCase();
    if (statusLower.includes("completed") || statusLower.includes("done")) {
      return 100;
    } else if (statusLower.includes("active") || statusLower.includes("in progress")) {
      return 50;
    } else if (statusLower.includes("todo") || statusLower.includes("pending")) {
      return 25;
    }
    return 10; // Default minimum progress
  };

  // Get progress bar color
  const getProgressColor = (progress) => {
    if (progress >= 100) return colors.success;
    if (progress >= 50) return colors.warning;
    return colors.info;
  };

  // Create safe data object with fallbacks
  const safeData = {
    name: data?.name || "Unknown Module",
    type: data?.type || "Unknown Type",
    status: data?.status || "Draft",
    image: data?.image,
    progress: data?.progress || calculateProgress(data?.status),
    cost: formatCost(data?.cost),
    assignedTo: data?.assignedTo || "Unassigned"
  };

  // Get typeLabel for display
  const getTypeLabel = (type) => {
    if (!type) return "Module";

    switch (type.toLowerCase()) {
      case 'roofing': return 'Roofing';
      case 'siteclearing': return 'Site Clearing';
      case 'excavation': return 'Excavation';
      case 'paving': return 'Paving';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const typeLabel = getTypeLabel(safeData.type);
  const backgroundColor = getBackgroundColor(safeData.status);
  const progressColor = getProgressColor(safeData.progress);

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.iconAndModule}>
          {safeData.image ? (
            <Image source={safeData.image} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <Icon
                name="home-repair-service"
                type="material"
                size={width * 0.05}
                color={colors.primary}
              />
            </View>
          )}
          <Text style={styles.leadingText} numberOfLines={1}>
            {safeData.name}
          </Text>
        </View>
        <TouchableOpacity onPress={handleToggle}>
          <Feather
            name={expanded ? "chevron-up" : "chevron-down"}
            size={width * 0.06}
            color="#013240"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.progress}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${safeData.progress}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>

      <Text style={styles.middleText}>{typeLabel} Module</Text>
      <Text style={styles.status}>Status: {safeData.status}</Text>

      {expanded && (
        <View style={styles.body}>
          <Text style={styles.description}>
            This is a {typeLabel.toLowerCase()} module for the project.
          </Text>
          <View style={styles.footer}>
            <Text style={styles.cost}>Cost: {safeData.cost}</Text>
            <Text style={styles.assigned}>Assigned to: {safeData.assignedTo}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ModuleCard;
