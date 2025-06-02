import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { machineService } from "../../services/machineService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/contants/constants";
import { API_URL } from "../../config/config";

const ManufacturerMachines = () => {
  const navigation = useNavigation();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});

  // Use useFocusEffect to reload data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Check if user is logged in
      const checkAuthentication = async () => {
        try {
          const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
          const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
          
          console.log('Auth check:', { 
            hasToken: !!token, 
            hasUserData: !!userData 
          });

          // Update debug info
          setDebugInfo({
            apiUrl: API_URL,
            hasToken: !!token,
            tokenFirstChars: token ? token.substring(0, 15) + '...' : 'None',
            hasUserData: !!userData,
            userId: userData ? JSON.parse(userData).user_id : 'None',
          });
          
          if (!token || !userData) {
            setError('Authentication required. Please log in.');
            setLoading(false);
            return false;
          }
          return true;
        } catch (error) {
          console.error('Auth check error:', error);
          setError('Error checking authentication.');
          setLoading(false);
          return false;
        }
      };

      const loadData = async () => {
        const isAuthenticated = await checkAuthentication();
        if (isAuthenticated) {
          fetchMachines();
        }
      };

      loadData();
      
      return () => {
        // Cleanup function
      };
    }, [])
  );

  const fetchMachines = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching machines...');
      const response = await machineService.getMachines();
      console.log('Machine service response:', response);
      
      if (response.success) {
        setMachines(response.data);
      } else {
        setError(response.message || "Failed to fetch machines");
        Alert.alert("Error", response.message || "Failed to fetch machines");
      }
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError("An unexpected error occurred while fetching machines");
      Alert.alert(
        "Error",
        "An unexpected error occurred while fetching machines"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEditMachine = (machine) => {
    navigation.navigate("EditMachine", { machine });
  };

  const handleDeleteMachine = async (machineId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this machine?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              
              const response = await machineService.deleteMachine(machineId);
              
              if (response.success) {
                // Remove the deleted machine from the state
                setMachines(machines.filter(m => m.machine_id !== machineId));
                Alert.alert("Success", "Machine deleted successfully");
              } else {
                Alert.alert("Error", response.message || "Failed to delete machine");
              }
            } catch (error) {
              console.error("Error deleting machine:", error);
              Alert.alert(
                "Error",
                "An unexpected error occurred while deleting the machine"
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMachines();
  };

  const debugLogin = async () => {
    try {
      // This is for debugging purposes only!
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, 'debug_token_for_testing');
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
        user_id: 1,
        userType: 'Manufacturer',
        name: 'Debug User'
      }));
      Alert.alert('Debug', 'Debug credentials set. Try refreshing.');
      fetchMachines();
    } catch (error) {
      console.error('Debug login error:', error);
    }
  };

  const renderMachineCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.machine_image }}
        style={styles.machineImage}
        defaultSource={require("../../assets/placeholder.png")}
      />
      <View style={styles.cardContent}>
        <Text style={styles.machineType}>{item.machine_type}</Text>
        <Text style={styles.machineModel}>{item.machine_model}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: item.availability_status
                  ? "#4CAF50"
                  : "#F44336",
              },
            ]}
          />
          <Text style={styles.statusText}>
            {item.availability_status ? "Available" : "Unavailable"}
          </Text>
        </View>
        <Text style={styles.hourlyRate}>
          ${parseFloat(item.hourly_rate).toFixed(2)}/hour
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditMachine(item)}
          >
            <Icon name="pencil" size={16} color="#FFF" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteMachine(item.machine_id)}
          >
            <Icon name="delete" size={16} color="#FFF" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB703" />
        <Text>Loading machines...</Text>
        {/* Debug toggle in loading screen */}
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={() => setShowDebug(!showDebug)}
        >
          <Text style={styles.debugButtonText}>Debug</Text>
        </TouchableOpacity>
        
        {showDebug && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugTitle}>Debug Info</Text>
            {Object.entries(debugInfo).map(([key, value]) => (
              <Text key={key} style={styles.debugText}>
                {key}: {value?.toString()}
              </Text>
            ))}
            <TouchableOpacity 
              style={styles.debugLoginButton}
              onPress={debugLogin}
            >
              <Text style={styles.debugButtonText}>Set Debug Credentials</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={60} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchMachines}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        
        {/* Debug toggle in error screen */}
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={() => setShowDebug(!showDebug)}
        >
          <Text style={styles.debugButtonText}>Debug</Text>
        </TouchableOpacity>
        
        {showDebug && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugTitle}>Debug Info</Text>
            {Object.entries(debugInfo).map(([key, value]) => (
              <Text key={key} style={styles.debugText}>
                {key}: {value?.toString()}
              </Text>
            ))}
            <TouchableOpacity 
              style={styles.debugLoginButton}
              onPress={debugLogin}
            >
              <Text style={styles.debugButtonText}>Set Debug Credentials</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Machines</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("ManufacturerRegistration")}
        >
          <Icon name="plus" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add Machine</Text>
        </TouchableOpacity>
      </View>
      
      {machines.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="engine-off" size={60} color="#BFBFBF" />
          <Text style={styles.emptyText}>
            You haven't registered any machines yet
          </Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("ManufacturerRegistration")}
          >
            <Text style={styles.registerButtonText}>Register a Machine</Text>
          </TouchableOpacity>
          
          {/* Debug toggle in empty screen */}
          <TouchableOpacity 
            style={styles.debugButton}
            onPress={() => setShowDebug(!showDebug)}
          >
            <Text style={styles.debugButtonText}>Debug</Text>
          </TouchableOpacity>
          
          {showDebug && (
            <View style={styles.debugContainer}>
              <Text style={styles.debugTitle}>Debug Info</Text>
              {Object.entries(debugInfo).map(([key, value]) => (
                <Text key={key} style={styles.debugText}>
                  {key}: {value?.toString()}
                </Text>
              ))}
              <TouchableOpacity 
                style={styles.debugLoginButton}
                onPress={debugLogin}
              >
                <Text style={styles.debugButtonText}>Set Debug Credentials</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <FlatList
          data={machines}
          renderItem={renderMachineCard}
          keyExtractor={(item) => item.machine_id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            showDebug ? (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Debug Info</Text>
                {Object.entries(debugInfo).map(([key, value]) => (
                  <Text key={key} style={styles.debugText}>
                    {key}: {value?.toString()}
                  </Text>
                ))}
                <TouchableOpacity 
                  style={styles.debugLoginButton}
                  onPress={debugLogin}
                >
                  <Text style={styles.debugButtonText}>Set Debug Credentials</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
      
      {/* Debug toggle button */}
      {machines.length > 0 && (
        <TouchableOpacity 
          style={styles.floatingDebugButton}
          onPress={() => setShowDebug(!showDebug)}
        >
          <Text style={styles.debugButtonText}>Debug</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#FFB703",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFB703",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  machineImage: {
    width: 120,
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  machineType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  machineModel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#666666",
  },
  hourlyRate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFB703",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  registerButton: {
    backgroundColor: "#FFB703",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  registerButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
  debugButton: {
    marginTop: 20,
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  floatingDebugButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 5,
  },
  debugButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  debugContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#333",
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  debugTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  debugText: {
    color: "#FFF",
    fontSize: 12,
    marginBottom: 4,
  },
  debugLoginButton: {
    marginTop: 12,
    backgroundColor: "#FFB703",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
});

export default ManufacturerMachines; 