import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import ModuleCardStyles from "../../Styles/Components/ModuleCardStyles";
import { colors } from "../../Styles/Themes/colors";

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
      return "PKR 0.00";
    }
    return `PKR ${parseFloat(cost).toFixed(2)}`;
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
      case 'fabricprice': return 'Fabric Price';
      case 'cutting': return 'Cutting';
      case 'logoprinting': return 'Logo Printing';
      case 'stitching': return 'Stitching';
      case 'packaging': return 'Packaging';
      case 'fabricquantity': return 'Fabric Quantity';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Get icon name based on module type
  const getIconName = (type) => {
    if (!type) return "build";

    switch (type.toLowerCase()) {
      case 'fabricprice': return "style";
      case 'cutting': return "content-cut";
      case 'logoprinting': return "brush";
      case 'stitching': return "gesture";
      case 'packaging': return "inventory";
      case 'fabricquantity': return "straighten";
      default: return "build";
    }
  };

  const typeLabel = getTypeLabel(safeData.type);
  const backgroundColor = getBackgroundColor(safeData.status);
  const progressColor = getProgressColor(safeData.progress);
  const iconName = getIconName(safeData.type);

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
                name={iconName}
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
            {getModuleDescription(safeData.type, data)}
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

// Helper function to generate appropriate description based on module type
const getModuleDescription = (type, data) => {
  if (!type) return "Module details not available.";

  switch (type.toLowerCase()) {
    case 'fabricprice':
      return `Fabric pricing for ${data.category || 'unknown'} - ${data.subCategory || 'unknown'} category.`;
    case 'cutting':
      return `Cutting module with ${data.cuttingStyle || 'standard'} style. Rate per shirt: PKR ${parseFloat(data.ratePerShirt || 0).toFixed(2)}.`;
    case 'logoprinting':
      const logoCount = data.logoDetails?.length || 0;
      return `Logo printing module with ${logoCount} logo(s). ${logoCount > 0 ? `Position: ${data.logoDetails[0].logoPosition}, Style: ${data.logoDetails[0].printingStyle}` : ''}`;
    case 'stitching':
      return `Stitching module with rate per shirt: PKR ${parseFloat(data.ratePerShirt || 0).toFixed(2)}.`;
    case 'packaging':
      return `Packaging module for ${data.quantity || 0} items.`;
    case 'fabricquantity':
      return `Fabric quantity for ${data.shirtType || 'unknown'} shirt, size ${data.fabricSize || 'unknown'}.`;
    default:
      return `This is a ${type.toLowerCase()} module.`;
  }
};

export default ModuleCard;
