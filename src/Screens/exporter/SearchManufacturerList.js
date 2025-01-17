import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import manufacturersData from "../../utils/Data/Manufacturers";
import FilterButton from "../../components/common/FilterButton";
import SearchNewManufacturerCard from "../../components/manufacturer/SearchNewManufacturerCard";
import { SearchManufacturerStyle } from "../../Styles/Screens/Exporter/SearchManufacturerStyle";
import { Dimensions } from "react-native";
import labelsList from "../../utils/Data/LabelsList";

const { width, height } = Dimensions.get("window");
const styles = SearchManufacturerStyle(width, height);

const SearchManufacturerList = ({ navigation }) => {
  const [manufacturers, setManufacturers] = useState(manufacturersData);
  const [activeSort, setActiveSort] = useState(null);
  const [activeLabels, setActiveLabels] = useState([]);

  const sortManufacturers = (criteria) => {
    const sorted = [...manufacturers].sort((a, b) => a[criteria] - b[criteria]);
    setManufacturers(sorted);

    setActiveSort((prev) => (prev === criteria ? null : criteria));
    if (activeSort === criteria) {
      setManufacturers(manufacturersData);
    }
  };

  const filterByLabels = (label) => {
    let updatedLabels;
    if (activeLabels.includes(label)) {
      updatedLabels = activeLabels.filter((item) => item !== label);
    } else {
      updatedLabels = [...activeLabels, label];
    }
    setActiveLabels(updatedLabels);

    if (updatedLabels.length === 0) {
      setManufacturers(manufacturersData);
    } else {
      const filtered = manufacturersData.filter((manufacturer) =>
        updatedLabels.every((lbl) => manufacturer.labels.includes(lbl))
      );
      setManufacturers(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedButtonRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            label="Rating"
            isActive={activeSort === "rating"}
            onPress={() => sortManufacturers("rating")}
          />
          <FilterButton
            label="Level"
            isActive={activeSort === "level"}
            onPress={() => sortManufacturers("level")}
          />
          <FilterButton
            label="Distance"
            isActive={activeSort === "distance"}
            onPress={() => sortManufacturers("distance")}
          />
          {labelsList.map((label) => (
            <FilterButton
              key={label}
              label={label}
              isActive={activeLabels.includes(label)}
              onPress={() => filterByLabels(label)}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        {manufacturers.map((manufacturer) => (
          <SearchNewManufacturerCard
            key={manufacturer.id}
            manufacturer={manufacturer}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchManufacturerList;
