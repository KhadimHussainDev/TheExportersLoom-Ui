import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';
import { storageService } from '../../services/storageService';
import { ROLES, STORAGE_KEYS } from '../../utils/contants/constants';

const AuthLoadingScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Retrieve the token from storage
        const tokenResponse = await storageService.get(STORAGE_KEYS.USER_TOKEN);

        // If no token exists, navigate to the auth screen
        if (!tokenResponse.success || !tokenResponse.data) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
          });
          return;
        }

        // Validate the token (check if it's expired)
        try {
          const token = tokenResponse.data;
          const decodedToken = jwtDecode(token);

          // Check if token is expired
          const currentTime = Date.now() / 1000; // Convert to seconds
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            // Token is expired, clear storage and navigate to login
            const removeTokenResponse = await storageService.remove(STORAGE_KEYS.USER_TOKEN);
            const removeUserDataResponse = await storageService.remove(STORAGE_KEYS.USER_DATA);

            if (!removeTokenResponse.success || !removeUserDataResponse.success) {
              console.error('Failed to clear expired token data');
            }

            navigation.reset({
              index: 0,
              routes: [{ name: 'SignInScreen' }],
            });
            return;
          }

          // Token is valid, navigate to the appropriate dashboard
          const userDataResponse = await storageService.get(STORAGE_KEYS.USER_DATA);
          const userData = userDataResponse.success ? userDataResponse.data : null;

          if (userData && userData.userType === ROLES.MANUFACTURER) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ManufacturerDashboardStack' }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ExporterDashboardStack' }],
            });
          }
        } catch (decodeError) {
          // Invalid token, clear storage and navigate to login
          console.error('Error decoding token:', decodeError);
          const removeTokenResponse = await storageService.remove(STORAGE_KEYS.USER_TOKEN);
          const removeUserDataResponse = await storageService.remove(STORAGE_KEYS.USER_DATA);

          if (!removeTokenResponse.success || !removeUserDataResponse.success) {
            console.error('Failed to clear invalid token data');
          }

          navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }],
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Add back button handler to prevent going back to login screen
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // If we're on the AuthLoadingScreen, don't allow back navigation
      if (navigation.isFocused()) {
        return true; // Prevent default behavior
      }
      return false; // Let default behavior happen
    });

    return () => backHandler.remove(); // Clean up the event listener
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AuthLoadingScreen; 