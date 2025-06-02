import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableOpacity, ScrollView, Alert } from "react-native";
import RequestCard from "../../components/common/RequestCard";
import { bidService } from "../../services/bidService";
import { orderService } from "../../services/orderService";
import { notificationService } from "../../services/notificationService";
import { colors } from "../../Styles/Themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/contants/constants";
import apiClient from "../../services/apiClient";

// Module to machine type mapping for reference and filtering
const MODULE_TO_MACHINE_MAP = {
  CuttingModule: 'Cutting',
  StitchingModule: 'Stitching',
  LogoPrintingModule: 'Logo Printing',
  FabricPricingModule: 'Fabric Pricing',
  PackagingModule: 'Packaging',
  // Add alternative case formats to ensure matching
  cuttingmodule: 'Cutting',
  stitchingmodule: 'Stitching',
  logoprintingmodule: 'Logo Printing',
  fabricpricingmodule: 'Fabric Pricing',
  packagingmodule: 'Packaging',
};

// Helper function to normalize module type
const normalizeModuleType = (moduleType) => {
  if (!moduleType) return '';
  const normalized = moduleType.toLowerCase().replace(/\s+/g, '');
  return MODULE_TO_MACHINE_MAP[normalized] || MODULE_TO_MACHINE_MAP[moduleType] || moduleType;
};

const WorkOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [userMachines, setUserMachines] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data including user ID and machines
  const fetchUserData = useCallback(async () => {
    try {
      const userDataStr = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!userDataStr) return null;
      
      const userData = JSON.parse(userDataStr);
      console.log("👤 User data retrieved:", userData.user_id);
      setUserData(userData);
      return userData;
    } catch (err) {
      console.error("❌ Error fetching user data:", err);
      return null;
    }
  }, []);

  // Fetch the user's machines to help with local filtering if needed
  const fetchUserMachines = useCallback(async () => {
    try {
      // First ensure we have user data
      const userData = await fetchUserData();
      if (!userData) return [];
      
      // Log for debugging
      console.log("👤 User data for machines check:", JSON.stringify(userData));
      
      // Check if machines are in the userData directly
      if (userData.machines && Array.isArray(userData.machines) && userData.machines.length > 0) {
        console.log("📋 User machines from storage:", userData.machines.map(m => m.machine_type));
        setUserMachines(userData.machines);
        return userData.machines;
      }
      
      // If not in userData directly, check if they're in the user object
      if (userData.user && userData.user.machines && Array.isArray(userData.user.machines) && userData.user.machines.length > 0) {
        console.log("📋 User machines from user object:", userData.user.machines.map(m => m.machine_type));
        setUserMachines(userData.user.machines);
        return userData.user.machines;
      }
      
      // If still not found, try to fetch from API
      console.log("⚠️ No machines found in user data, fetching from API...");
      
      // You would need to implement this API call in a service
      // This is just a placeholder - implement according to your API
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
        if (!token) return [];
        
        const userId = userData.user_id || (userData.user && userData.user.user_id);
        if (!userId) return [];
        
        // Make an API call to fetch machines
        const response = await apiClient.get(`/machines/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.success) {
          const machines = response.data.data || [];
          console.log("📋 User machines from API:", machines.map(m => m.machine_type));
          setUserMachines(machines);
          return machines;
        }
      } catch (apiErr) {
        console.error("❌ Error fetching machines from API:", apiErr);
      }
      
      console.log("⚠️ No machines found in API response");
      return [];
    } catch (err) {
      console.error("❌ Error fetching user machines:", err);
      return [];
    }
  }, [fetchUserData]);

  // Function to fetch opportunities
  const fetchOpportunities = useCallback(async () => {
    console.log("⏳ Fetching work opportunities...");
    try {
      setError(null);
      
      // First, get the user's machines
      const machines = await fetchUserMachines();
      
      // Fetch relevant bids for the manufacturer
      const response = await bidService.getRecommendedBids();
      console.log("📊 API Response received");
      
      if (response.success) {
        let bids = response.data || [];
        console.log("✅ Fetched opportunities:", bids.length);
        
        // Additional client-side filtering if needed
        // This is a fallback in case the server-side filtering isn't working correctly
        if (machines.length > 0 && bids.length > 0) {
          const machineTypes = machines.map(m => m.machine_type);
          console.log("🔍 User machine types:", machineTypes);
          
          // Create a machine-to-module mapping (reverse of MODULE_TO_MACHINE_MAP)
          const machineToModuleMap = {};
          
          // Populate the reverse mapping
          Object.entries(MODULE_TO_MACHINE_MAP).forEach(([moduleType, machineType]) => {
            const machineTypeLower = machineType.toLowerCase();
            if (!machineToModuleMap[machineTypeLower]) {
              machineToModuleMap[machineTypeLower] = [];
            }
            machineToModuleMap[machineTypeLower].push(moduleType);
          });
          
          console.log("🔄 Machine to Module mapping:", machineToModuleMap);
          
          // Get all module types that correspond to the manufacturer's machine types
          const relevantModuleTypes = [];
          
          // For each machine type the manufacturer has, add the corresponding module types
          machineTypes.forEach(machineType => {
            const machineTypeLower = machineType.toLowerCase();
            const correspondingModuleTypes = machineToModuleMap[machineTypeLower] || [];
            relevantModuleTypes.push(...correspondingModuleTypes);
          });
          
          // Remove duplicates
          const uniqueModuleTypes = [...new Set(relevantModuleTypes)];
          console.log("🔍 Relevant module types for client filtering:", uniqueModuleTypes);
          
          // Filter bids to only include those that match relevant module types
          const filteredBids = bids.filter(bid => {
            if (!bid.module_type) return false;
            const normalizedModuleType = normalizeModuleType(bid.module_type);
            return uniqueModuleTypes.some(moduleType => 
              moduleType === normalizedModuleType || 
              moduleType.toLowerCase() === normalizedModuleType.toLowerCase()
            );
          });
          
          console.log("🔍 After filtering:", filteredBids.length, "opportunities match your machines");
          
          // Only use filtered bids if they exist, otherwise fallback to all bids
          // This prevents showing no results due to filtering issues
          if (filteredBids.length > 0) {
            bids = filteredBids;
          } else {
            console.log("⚠️ No matching bids after filtering, showing all opportunities");
          }
        }
        
        setOpportunities(bids);
      } else {
        console.error("❌ Failed to fetch opportunities:", response.message);
        setError(response.message || "Failed to load work opportunities");
      }
    } catch (err) {
      console.error("❌ Error fetching opportunities:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchUserMachines]);

  // Fetch opportunities when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      console.log("🔍 Work screen focused, fetching opportunities");
      setLoading(true);
      fetchOpportunities();
      
      return () => {
        console.log("📤 Work screen unfocused, cleaning up");
      };
    }, [fetchOpportunities])
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    console.log("🔄 Pull-to-refresh triggered");
    setRefreshing(true);
    fetchOpportunities();
  }, [fetchOpportunities]);

  // Handle decline - simply remove from list
  const handleDecline = useCallback((bidId) => {
    console.log("🚫 Declining opportunity:", bidId);
    // Just remove from the list locally without any backend call
    setOpportunities(prev => prev.filter(bid => bid.bid_id !== bidId));
    
    // Show success message
    Alert.alert(
      "Opportunity Declined",
      "The work opportunity has been removed from your list",
      [{ text: "OK" }]
    );
  }, []);

  // Handle accept - create an order
  const handleAccept = useCallback(async (bid) => {
    console.log("✅ Accepting opportunity:", bid.bid_id);
    
    try {
      // Check if we have user data
      if (!userData || !userData.user_id) {
        console.error("❌ User data not available");
        Alert.alert("Error", "User information not available. Please log in again.");
        return;
      }
      
      // Re-fetch user machines to ensure we have the latest data
      const machines = await fetchUserMachines();
      
      // Check if we have any machines to use
      if (!machines || machines.length === 0) {
        console.error("❌ No machines available");
        Alert.alert(
          "No Machines Available", 
          "You need to register at least one machine before accepting work. Please go to Machine Management to add machines.",
          [
            { text: "OK" }
          ]
        );
        return;
      }
      
      // Log what we found
      console.log("🔍 User machines for bid acceptance:", JSON.stringify(machines));
      
      // Find a suitable machine for this module type
      const machineType = normalizeModuleType(bid.module_type);
      console.log(`🔍 Looking for machine type "${machineType}" for module "${bid.module_type}"`);
      
      const suitableMachine = machines.find(m => 
        m.machine_type === machineType || 
        m.machine_type.toLowerCase() === machineType.toLowerCase()
      );
      
      if (!suitableMachine) {
        console.error("❌ No suitable machine found for", bid.module_type);
        Alert.alert(
          "No Suitable Machine", 
          `You need a ${machineType} machine to accept this work. Your registered machines are: ${machines.map(m => m.machine_type).join(', ')}`,
          [
            { text: "OK" }
          ]
        );
        return;
      }
      
      console.log("✅ Found suitable machine:", suitableMachine.machine_id, suitableMachine.machine_type);
      
      // Show a confirmation dialog with price and details
      Alert.alert(
        "Accept Work Opportunity",
        `You are about to accept a work opportunity for ${bid.price ? `$${bid.price}` : 'negotiable price'}.\n\nThis will create an order and notify the exporter.`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Accept", 
            onPress: async () => {
              // Set loading state
              setLoading(true);
              
              // Create the order
              const orderData = {
                bidId: bid.bid_id,
                exporterId: bid.user.user_id, // The exporter who created the bid
                manufacturerId: userData.user_id, // Current user (manufacturer)
                machineId: suitableMachine.machine_id,
                status: "PENDING", // Initial status
                price: bid.price || 0,
                deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
                notes: `Order created for ${bid.module_type} work using ${suitableMachine.machine_type} machine: ${bid.title || 'Work Opportunity'}`
              };
              
              console.log("📝 Creating order with data:", orderData);
              
              const response = await orderService.createOrder(orderData);
              
              if (response.success) {
                console.log("✅ Order created successfully:", response.data);
                
                // Remove the bid from the list
                setOpportunities(prev => prev.filter(b => b.bid_id !== bid.bid_id));
                
                // Show success message
                Alert.alert(
                  "Order Created",
                  "You have successfully accepted this work opportunity. A new order has been created.",
                  [{ text: "OK" }]
                );
              } else {
                console.error("❌ Failed to create order:", response.message);
                Alert.alert("Error", response.message || "Failed to create order");
              }
              
              // Reset loading state
              setLoading(false);
            }
          }
        ]
      );
    } catch (err) {
      console.error("❌ Error accepting opportunity:", err);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }, [userData, fetchUserMachines]);

  // Loading state
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading work opportunities...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={50} color={colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchOpportunities}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Empty state or list of opportunities
  if (opportunities.length === 0) {
    return (
      <ScrollView 
        contentContainerStyle={styles.emptyScrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.emptyContainer}>
          <Ionicons name="briefcase-outline" size={60} color={colors.primary} />
          <Text style={styles.emptyText}>No work opportunities available at this time</Text>
          <Text style={styles.emptySubText}>Pull down to refresh</Text>
        </View>
      </ScrollView>
    );
  }

  // List of opportunities
  return (
    <View style={styles.container}>
      <FlatList
        data={opportunities}
        keyExtractor={(item) => item.bid_id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <RequestCard 
            bid={item} 
            onAccept={() => handleAccept(item)}
            onDecline={() => handleDecline(item.bid_id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            progressBackgroundColor="#ffffff"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="briefcase-outline" size={60} color={colors.primary} />
            <Text style={styles.emptyText}>No work opportunities available at this time</Text>
            <Text style={styles.emptySubText}>Pull down to refresh</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E2FDFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#E2FDFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#E2FDFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textDark,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyScrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2FDFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    marginTop: -10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 300,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: colors.textDark,
    textAlign: "center",
    fontWeight: "bold",
  },
  emptySubText: {
    marginTop: 5,
    fontSize: 14,
    color: colors.textLight,
  },
});

export default WorkOpportunities;
