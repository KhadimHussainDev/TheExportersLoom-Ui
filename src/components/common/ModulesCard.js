import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ModuleCardStyles from "../../Styles/Components/ModuleCardStyles";

const { width, height } = Dimensions.get("window");
const styles = ModuleCardStyles(width, height); // Get screen dimensions

const ModuleCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  // Get the styles dynamically by passing width and height

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  // Determine the background color based on the status
  const getBackgroundColor = (status) => {
    if (status === "Completed") {
      return "#DFFFD6"; // Light parrot green
    } else if (status === "Not Started") {
      return "#F0F0F0"; // Light grey
    } else {
      return "#FFFFFF"; // Default white
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[
        styles.cardContainer,
        { backgroundColor: getBackgroundColor(data.status) },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconAndModule}>
          <Image source={data.image} style={styles.image} />
          <Text style={styles.leadingText}>{data.leadingText}</Text>
        </View>
        <TouchableOpacity onPress={handleToggle}>
          <Feather
            name={expanded ? "chevron-up" : "chevron-down"}
            size={width * 0.06} // Dynamic size based on width
            color="#013240"
          />
        </TouchableOpacity>
      </View>

      {/* middleText and Status */}
      <Text style={styles.middleText}>{data.middleText}</Text>
      <Text style={styles.status}>{data.status}</Text>

      {/* Body */}
      {expanded && (
        <Animated.View style={styles.body}>
          <Text style={styles.description}>{data.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.cost}>Cost: ${data.cost}</Text>
            <Text style={styles.assigned}>Assigned to: {data.assignedTo}</Text>
          </View>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default ModuleCard;
