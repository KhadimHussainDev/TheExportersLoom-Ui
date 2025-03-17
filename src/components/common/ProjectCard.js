import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import OrderCardStyles from "../../Styles/Components/OrderCardStyles";
import { PROJECT_STATUS } from "../../utils/contants/constants";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = OrderCardStyles(width, height);

const ProjectCard = ({ project, onPress }) => {
  // State to track if module details are expanded
  const [showModuleDetails, setShowModuleDetails] = useState(false);

  // Add console.log for debugging
  const handlePress = () => {
    // console.log("Project card clicked:", project.id);
    if (onPress) {
      onPress();
    }
  };

  // Toggle module details visibility
  const toggleModuleDetails = () => {
    setShowModuleDetails(!showModuleDetails);
  };

  // Extract data with default values
  const {
    id,
    name = "Unnamed Project",
    description = "No description",
    status = PROJECT_STATUS.DRAFT,
    budget = 0,
    completedModules = 0,
    ongoingModules = 0,
    todoModules = 0,
    totalModules = 0,
    progress = 0
  } = project || {};

  // Format budget to 2 decimal places
  const formattedBudget = typeof budget === 'number'
    ? budget.toFixed(2)
    : budget;

  // Calculate status colors
  const getStatusColor = (status) => {
    if (!status) return "#cccccc"; // default gray

    const statusStr = String(status).toLowerCase();

    if (statusStr.includes('complete')) return "#3cb371"; // green
    if (statusStr.includes('active')) return "#ffcc00"; // yellow
    if (statusStr.includes('cancel')) return "#ff6347"; // tomato
    if (statusStr.includes('pending')) return "#4da6ff"; // blue

    return "#cccccc"; // gray for unknown status
  };

  // Format the progress percentage
  const progressPercentage = typeof progress === 'number' ? progress.toFixed(0) : 0;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      {/* Main Card Content */}
      <View style={styles.cardContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.orderName}>{name}</Text>
          <View style={styles.iconsLeft}>
            <TouchableOpacity style={styles.chatIcon}>
              <FontAwesome5 name="comment-alt" size={18} color="#004d66" />
            </TouchableOpacity>
            <MaterialIcons name="attach-file" size={20} color="#004d66" />
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.details}>
          <Text style={styles.detailText} numberOfLines={2}>{description}</Text>
          <View style={styles.row}>
            <Text style={styles.detailText}>Budget: ${formattedBudget}</Text>
            <Text style={styles.detailText}>
              Status:{" "}
              <Text style={{ color: getStatusColor(status) }}>
                {status}
              </Text>
            </Text>
            <TouchableOpacity onPress={toggleModuleDetails}>
              <Text style={[styles.detailText, styles.moduleToggle]}>
                Modules: {completedModules}/{totalModules} {showModuleDetails ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Module Details Section - Expandable */}
          {showModuleDetails && (
            <View style={styles.moduleDetailsContainer}>
              <View style={styles.moduleItem}>
                <View style={[styles.moduleIndicator, { backgroundColor: '#3cb371' }]} />
                <Text style={styles.moduleText}>Completed: {completedModules}</Text>
              </View>
              <View style={styles.moduleItem}>
                <View style={[styles.moduleIndicator, { backgroundColor: '#ffcc00' }]} />
                <Text style={styles.moduleText}>Ongoing: {ongoingModules}</Text>
              </View>
              <View style={styles.moduleItem}>
                <View style={[styles.moduleIndicator, { backgroundColor: '#4da6ff' }]} />
                <Text style={styles.moduleText}>Todo: {todoModules}</Text>
              </View>
            </View>
          )}

          {/* Progress Section */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {String(status).toLowerCase().includes('complete')
                ? "✅ Project Completed"
                : String(status).toLowerCase().includes('active')
                  ? `🔄 Project Active (${progressPercentage}% complete)`
                  : String(status).toLowerCase().includes('pending')
                    ? `⏳ Project Pending (${progressPercentage}% complete)`
                    : `📝 Project Draft (${progressPercentage}% complete)`}
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progress}%`,
                    backgroundColor: getStatusColor(status),
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.daysLeft}>Module Progress: {completedModules} of {totalModules} complete</Text>
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

export default ProjectCard; 