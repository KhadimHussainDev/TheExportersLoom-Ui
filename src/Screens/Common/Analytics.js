import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import OrderList from "../../components/common/OrderList";
import OrderSummaryCircle from "../../components/common/OrderSummaryCircle";
import ProjectList from "../../components/common/ProjectList";
import SummaryOverview from "../../components/common/SummaryOverview";
import { orderService } from "../../services/orderService";
import { projectService } from "../../services/projectService";
import { storageService } from "../../services/storageService";
import Analyticstyles from "../../Styles/Screens/Analyticstyles";
import { ROLES, STORAGE_KEYS } from "../../utils/contants/constants";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();

const styles = Analyticstyles(width, height);

const Analytics = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const userDataResponse = await storageService.get(STORAGE_KEYS.USER_DATA);
      // console.log("User data response:", userDataResponse);

      if (userDataResponse.success && userDataResponse.data) {
        // console.log("Found user data:", userDataResponse.data);
        setUserData(userDataResponse.data);
      } else {
        setError('User data not found. Please log in again.');
        console.error('Failed to fetch user data:', userDataResponse.message);
      }
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    if (!userData || !userData.user_id) {
      // console.log("Missing userData or userData.user_id, returning early");
      return;
    }

    setLoading(true);
    setError(null);

    // Check if user is exporter or manufacturer
    const isExporter = userData.userType &&
      userData.userType.toLowerCase() === ROLES.EXPORTER.toLowerCase();

    // console.log(`User is ${isExporter ? 'exporter' : 'manufacturer'}`);

    try {
      if (isExporter) {
        // Fetch exporter-specific projects
        const projectsResponse = await projectService.getUserProjects(userData.user_id);
        // console.log("User projects response:", projectsResponse);
        if (projectsResponse.success) {
          setData(projectsResponse.data || []);
        } else {
          console.error('Failed to fetch user projects:', projectsResponse.message);
          setError('Failed to load projects');
        }

        // Fetch exporter-specific project statistics
        const statsResponse = await projectService.getUserProjectStatistics(userData.user_id);
        // console.log("User project statistics response:", statsResponse);
        if (statsResponse.success) {
          setStatistics(statsResponse.data || {});
        } else {
          console.error('Failed to fetch user project statistics:', statsResponse.message);
          setError('Failed to load statistics');
        }
      } else {
        // Fetch manufacturer-specific orders
        const ordersResponse = await orderService.getUserOrders(userData.user_id);
        // console.log("User orders response:", ordersResponse);
        if (ordersResponse.success) {
          setData(ordersResponse.data || []);
        } else {
          console.error('Failed to fetch user orders:', ordersResponse.message);
          setError('Failed to load orders');
        }

        // Fetch manufacturer-specific order statistics
        const statsResponse = await orderService.getUserOrderStatistics(userData.user_id);
        // console.log("User statistics response:", statsResponse);
        if (statsResponse.success) {
          setStatistics(statsResponse.data || {});
        } else {
          console.error('Failed to fetch user order statistics:', statsResponse.message);
          setError('Failed to load statistics');
        }
      }
    } catch (err) {
      // console.error('Error fetching analytics data:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch analytics data after user data is loaded
  useEffect(() => {
    if (userData) {
      fetchAnalyticsData();
    }
  }, [userData]);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAnalyticsData();
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading analytics data...</Text>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Check if user is exporter or manufacturer
  const isExporter = userData && userData.userType &&
    userData.userType.toLowerCase() === ROLES.EXPORTER.toLowerCase();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#f6a018"]} // Match app theme
          tintColor="#f6a018"
        />
      }
    >
      <View style={styles.row}>
        <OrderSummaryCircle
          statistics={statistics}
          userType={userData?.userType}
        />
        <SummaryOverview statistics={statistics} />
      </View>

      {/* Conditionally render the right list component based on user type */}
      {isExporter ? (
        <ProjectList projects={data} navigation={navigation} />
      ) : (
        <OrderList orders={data} navigation={navigation} />
      )}
    </ScrollView>
  );
};

export default Analytics;
