import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../Styles/Themes/colors";

// Module to machine type mapping
const MODULE_TO_MACHINE_MAP = {
  CuttingModule: 'Cutting',
  StitchingModule: 'Stitching',
  LogoPrintingModule: 'Logo Printing',
  FabricPricingModule: 'Fabric Pricing',
  PackagingModule: 'Packaging',
};

const RequestCard = ({ bid, onAccept, onDecline }) => {
  // Format the date for display
  const getTimeAgo = (dateString) => {
    try {
      if (!dateString) return 'Recently';
      
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);
      
      if (diffDay > 30) {
        return `${Math.floor(diffDay / 30)} month${Math.floor(diffDay / 30) > 1 ? 's' : ''} ago`;
      } else if (diffDay > 0) {
        return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
      } else if (diffHour > 0) {
        return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
      } else if (diffMin > 0) {
        return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Recently';
    }
  };

  // Get display name for the module type
  const getModuleDisplayName = (moduleType) => {
    if (!moduleType) return "General Work";
    
    // If it's already a machine type, return it formatted
    if (Object.values(MODULE_TO_MACHINE_MAP).includes(moduleType)) {
      return moduleType;
    }
    
    // If it's a module type, convert to machine type
    const machineType = MODULE_TO_MACHINE_MAP[moduleType];
    if (machineType) {
      return machineType;
    }
    
    // Format the module type if it's not in the mapping
    // Convert "CamelCaseModule" to "Camel Case"
    return moduleType
      .replace(/([A-Z])/g, ' $1') // Add space before capitals
      .replace(/Module$/, '')      // Remove "Module" suffix
      .trim();                    // Remove extra spaces
  };

  // Confirm action before proceeding
  const confirmAction = (action, actionType) => {
    Alert.alert(
      `${actionType} Work Opportunity`,
      `Are you sure you want to ${actionType.toLowerCase()} this work opportunity?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: actionType, onPress: action }
      ]
    );
  };

  // Get appropriate icon for the module type
  const getModuleIcon = (moduleType) => {
    if (!moduleType) return 'briefcase-outline';
    
    // Get the machine type if this is a module type
    const machineType = MODULE_TO_MACHINE_MAP[moduleType] || moduleType;
    
    // Match based on machine type
    if (machineType.toLowerCase().includes('cutting')) {
      return 'cut-outline';
    } else if (machineType.toLowerCase().includes('stitching')) {
      return 'construct-outline';
    } else if (machineType.toLowerCase().includes('packaging')) {
      return 'cube-outline';
    } else if (machineType.toLowerCase().includes('printing') || machineType.toLowerCase().includes('logo')) {
      return 'print-outline';
    } else if (machineType.toLowerCase().includes('fabric') || machineType.toLowerCase().includes('pricing')) {
      return 'cash-outline';
    } else {
      return 'briefcase-outline';
    }
  };

  // Get the formatted price
  const getFormattedPrice = (price) => {
    if (price === undefined || price === null) return "Price not specified";
    try {
      return `$${parseFloat(price).toFixed(2)}`;
    } catch (e) {
      return `$${price}`;
    }
  };

  return (
    <View style={styles.card}>
      {/* Module Icon */}
      <View style={styles.iconContainer}>
        <Icon name={getModuleIcon(bid.module_type)} size={28} color={colors.primary} />
      </View>

      {/* Request Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{bid.title || "Work Opportunity"}</Text>
        <Text style={styles.moduleName}>{getModuleDisplayName(bid.module_type)}</Text>
        <Text style={styles.description} numberOfLines={2}>{bid.description || "No description provided"}</Text>
        <View style={styles.priceTimeContainer}>
          <Text style={styles.price}>{getFormattedPrice(bid.price)}</Text>
          <Text style={styles.timeAgo}>{getTimeAgo(bid.created_at)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => confirmAction(onAccept, "Accept")}
        >
          <Icon name="checkmark" size={18} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => confirmAction(onDecline, "Decline")}
        >
          <Icon name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightBackground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 2,
  },
  moduleName: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 6,
  },
  priceTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.success,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.textLight,
  },
  actionContainer: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  acceptButton: {
    backgroundColor: colors.success,
  },
  declineButton: {
    backgroundColor: colors.error,
  },
});

export default RequestCard;
