import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SortButton from "../../components/common/SortButton";
import ManufacturerCard from "../../components/manufacturer/ManufacturerCard";
import BidDescription from "../../components/manufacturer/ModuleDescription";
import { recommendationService } from "../../services/recommendationService";
import ManufacturerSelectionStyle from "../../Styles/Screens/Exporter/ManufacturerSelectionStyle";
import { IMAGES } from "../../utils/contants/images";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = ManufacturerSelectionStyle(width, height);

const ManufacturerSelection = ({ route }) => {
  const [activeButtons, setActiveButtons] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract bid information from route params
  const {
    bidId,
    bidTitle,
    bidDescription,
    bidPrice,
    moduleType,
    exporterId
  } = route.params || {};

  // Fetch recommended manufacturers
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await recommendationService.getRecommendations(exporterId, bidId);

        if (response.success) {
          // Map the data to handle null images
          const mappedData = response.data.map(manufacturer => ({
            ...manufacturer,
            profileImage: manufacturer.profileImage || IMAGES.Profile
          }));
          setData(mappedData);
        } else {
          setError(response.message || 'Failed to fetch recommendations');
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (bidId && exporterId) {
      fetchRecommendations();
    }
  }, [bidId, exporterId]);

  const toggleButton = (key) => {
    setActiveButtons((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      applySorting(updated);
      return updated;
    });
  };

  const applySorting = (buttons) => {
    let sortedData = [...data];

    if (buttons.price) sortedData.sort((a, b) => a.estimatedPrice - b.estimatedPrice);
    if (buttons.distance) sortedData.sort((a, b) => a.distance - b.distance);
    if (buttons.rating) sortedData.sort((a, b) => b.avgRating - a.avgRating);
    if (buttons.time) sortedData.sort((a, b) => a.estimatedDays - b.estimatedDays);

    if (!Object.values(buttons).some(Boolean)) {
      // Default sorting: prioritize previously worked with manufacturers and higher ratings
      sortedData.sort((a, b) => {
        if (a.hasWorkedBefore !== b.hasWorkedBefore) {
          return b.hasWorkedBefore - a.hasWorkedBefore;
        }
        return b.avgRating - a.avgRating;
      });
    }

    setData(sortedData);
  };

  const renderItem = ({ item }) => (
    <ManufacturerCard
      name={item.u_username}
      profileImage={item.profileImage}
      distance={item.distance}
      price={item.estimatedPrice || bidPrice}
      rating={item.avgRating}
      days={item.estimatedDays}
      totalReviews={item.totalReviews}
      hasWorkedBefore={item.hasWorkedBefore}
      specialization={item.specialization}
      experienceYears={item.experienceYears}
      city={item.city}
      moduleType={moduleType}
      bidId={bidId}
      userId={item.userid}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Finding the best manufacturers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BidDescription
        bidTitle={bidTitle}
        bidDescription={bidDescription}
        bidPrice={bidPrice}
        moduleType={moduleType}
      />

      <View style={styles.buttonRow}>
        {["price", "distance", "rating", "time"].map((key) => (
          <SortButton
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            isActive={activeButtons[key]}
            onPress={() => toggleButton(key)}
          />
        ))}
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.userid.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No manufacturers found</Text>
          </View>
        }
      />
    </View>
  );
};

export default ManufacturerSelection;
