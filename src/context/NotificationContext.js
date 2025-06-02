import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';
import { notificationService } from '../services/notificationService';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Create the notification context
export const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotifications = () => {
  return useContext(NotificationContext);
};

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(0);
  const isPollingActive = useRef(true);
  const pollingInterval = useRef(null);

  // Register for push notifications on app start
  useEffect(() => {
    console.log('NotificationProvider initialized');
    registerForPushNotifications();
    
    // Fetch notifications when component mounts
    fetchNotifications();

    // Set up a polling mechanism to check for new notifications every 3 minutes (instead of every minute)
    startPolling();
    
    // Clean up on unmount
    return () => {
      stopPolling();
    };
  }, []);

  // Start notification polling
  const startPolling = () => {
    if (pollingInterval.current) return;
    
    console.log('Starting notification polling');
    isPollingActive.current = true;
    
    // Poll every 3 minutes (180000ms) to reduce load
    pollingInterval.current = setInterval(() => {
      if (isPollingActive.current) {
        console.log('Polling for new notifications');
        fetchNotifications();
      }
    }, 180000);
  };

  // Stop notification polling
  const stopPolling = () => {
    console.log('Stopping notification polling');
    isPollingActive.current = false;
    
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  };

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.isRead).length;
    setUnreadCount(count);
  }, [notifications]);

  // Register for push notifications
  const registerForPushNotifications = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
  };

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    const startTime = Date.now();
    console.log(`[${startTime}] fetchNotifications started`);
    
    // Prevent multiple concurrent calls
    if (loading) {
      console.log(`[${startTime}] Already loading notifications, skipping this request`);
      return Promise.resolve(); // Return a resolved promise for promise chaining
    }
    
    // Throttle requests to prevent too many API calls
    // Only fetch if at least 10 seconds have passed since last fetch
    const now = Date.now();
    if (now - lastFetched < 10000) {
      console.log(`[${startTime}] Throttling notification request - too soon since last fetch (${now - lastFetched}ms)`);
      return Promise.resolve(); // Return a resolved promise for promise chaining
    }
    
    try {
      setLoading(true);
      setError(null);
      setLastFetched(now);
      
      console.log(`[${startTime}] Fetching notifications from API...`);
      const response = await notificationService.getNotifications();
      
      console.log(`[${startTime}] API response received, success: ${response.success}`);
      
      if (response.success) {
        console.log(`[${startTime}] Received ${response.data?.length || 0} notifications`);
        setNotifications(response.data || []);
        return response; // Return the response for promise chaining
      } else {
        console.error(`[${startTime}] Failed to fetch notifications:`, response.message);
        setError(response.message);
        return response; // Return the response for promise chaining
      }
    } catch (err) {
      console.error(`[${startTime}] Error fetching notifications:`, err);
      setError('Failed to load notifications');
      return { success: false, error: err }; // Return error for promise chaining
    } finally {
      console.log(`[${startTime}] fetchNotifications finished, took ${Date.now() - startTime}ms`);
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await notificationService.markAsRead(notificationId);
      
      if (response.success) {
        // Update local state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            notification.id === notificationId 
              ? { ...notification, isRead: true } 
              : notification
          )
        );
      } else {
        console.error('Failed to mark notification as read:', response.message);
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Mark each unread notification as read
      const unreadNotifications = notifications.filter(notification => !notification.isRead);
      
      for (const notification of unreadNotifications) {
        await notificationService.markAsRead(notification.id);
      }
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  // Context value
  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 