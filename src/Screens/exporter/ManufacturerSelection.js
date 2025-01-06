import React, { useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import ModuleDescription from "../../components/manufacturer/ModuleDescription";
import ManufacturerCard from "../../components/manufacturer/ManufacturerCard";
import SortButton from "../../components/common/SortButton";
import manufacturers from "../../utils/Data/Manufacturers";
import ManufacturerSelectionStyle from "../../Styles/Screens/Exporter/ManufacturerSelectionStyle";

const { width, height } = Dimensions.get("window");
const styles = ManufacturerSelectionStyle(width, height);

const ManufacturerSelection = () => {
  const [activeButtons, setActiveButtons] = useState({});
  const [data, setData] = useState(manufacturers);

  const toggleButton = (key) => {
    setActiveButtons((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      applySorting(updated);
      return updated;
    });
  };

  const applySorting = (buttons) => {
    let sortedData = [...data];

    if (buttons.price) sortedData.sort((a, b) => a.price - b.price);
    if (buttons.distance) sortedData.sort((a, b) => a.distance - b.distance);
    if (buttons.rating) sortedData.sort((a, b) => a.rating - b.rating);
    if (buttons.time) sortedData.sort((a, b) => a.days - b.days);

    if (!Object.values(buttons).some(Boolean)) {
      sortedData = [...manufacturers];
    }

    setData(sortedData);
  };

  return (
    <View style={{ flex: 1 }}>
      <ModuleDescription />
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ManufacturerCard
            name={item.name}
            profileImage={item.profileImage}
            distance={item.distance}
            price={item.price.toFixed(2)}
            rating={item.rating}
            days={item.days}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ManufacturerSelection;
