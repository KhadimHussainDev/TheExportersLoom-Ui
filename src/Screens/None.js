import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const projectsList = [
  {
    projectName: "Winter Collection 2025",
    customerName: "Client Alpha",
    totalCost: 2750,
    priority: "High",
    modules: [1, 2, 3, 4, 5],
    daysLeft: 15,
    progress: "75%",
    modulesSummary: {
      completed: 2,
      ongoing: 1,
      todo: 2,
    },
  },
  {
    projectName: "Summer T-Shirts",
    customerName: "Client Beta",
    totalCost: 1750,
    priority: "Medium",
    modules: [2, 5, 6, 7],
    daysLeft: 30,
    progress: "50%",
    modulesSummary: {
      completed: 1,
      ongoing: 1,
      todo: 2,
    },
  },
  {
    projectName: "Custom Hoodies",
    customerName: "Client Gamma",
    totalCost: 3400,
    priority: "High",
    modules: [1, 3, 5, 6, 8],
    daysLeft: 10,
    progress: "90%",
    modulesSummary: {
      completed: 3,
      ongoing: 1,
      todo: 1,
    },
  },
  {
    projectName: "Sportswear Batch 1",
    customerName: "Client Delta",
    totalCost: 2200,
    priority: "Low",
    modules: [4, 5, 7],
    daysLeft: 20,
    progress: "30%",
    modulesSummary: {
      completed: 1,
      ongoing: 0,
      todo: 2,
    },
  },
  {
    projectName: "Festival Merchandise",
    customerName: "Client Epsilon",
    totalCost: 3100,
    priority: "Medium",
    modules: [1, 2, 3, 6, 8],
    daysLeft: 25,
    progress: "65%",
    modulesSummary: {
      completed: 2,
      ongoing: 2,
      todo: 1,
    },
  },
  {
    projectName: "Festival Merchandise",
    customerName: "Client Epsilon",
    totalCost: 3100,
    priority: "Medium",
    modules: [1, 2, 3, 6, 8],
    daysLeft: 25,
    progress: "65%",
    modulesSummary: {
      completed: 2,
      ongoing: 2,
      todo: 1,
    },
  },
  {
    projectName: "Festival Merchandise",
    customerName: "Client Epsilon",
    totalCost: 3100,
    priority: "Medium",
    modules: [1, 2, 3, 6, 8],
    daysLeft: 25,
    progress: "65%",
    modulesSummary: {
      completed: 2,
      ongoing: 2,
      todo: 1,
    },
  },
];

const ProjectCard = ({ project }) => {
  const {
    projectName,
    customerName,
    totalCost,
    priority,
    daysLeft,
    progress,
    modulesSummary,
  } = project;

  return (
    <View style={styles.card}>
      {/* Main Card Content */}
      <View style={styles.cardContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.projectName}>{projectName}</Text>
          <View style={styles.iconsLeft}>
            <TouchableOpacity style={styles.chatIcon}>
              <FontAwesome5 name="comment-alt" size={18} color="#004d66" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>8x</Text>
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
          name="chevron-right" // or "arrow-forward"
          size={18}
          color="#ffffff"
          style={styles.arrowIcon}
        />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {projectsList.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    height: 140, // Reduced height for the card
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectName: {
    fontSize: 16,
    color: "#004d66",
    fontWeight: "bold",
  },
  iconsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatIcon: {
    position: "relative",
    marginRight: 10,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  details: {
    marginTop: 1,
  },
  detailText: {
    fontSize: 12,
    color: "#333",
  },
  progressContainer: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    width: "80%",
  },
  progressBar: {
    height: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  daysLeft: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  rightBar: {
    width: 30,
    backgroundColor: "#013240",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});

export default App;
