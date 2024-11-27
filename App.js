import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const DropDownList = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropDownButtonText}>
          {selectedItem || "Select an item"}
        </Text>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const App = () => {
  const [selectedName, setSelectedName] = useState("");
  const handleSelect = (item) => {
    setSelectedName(item);
  };
  const names = ["Alice", "Bob", "Charlie", "David"];
  return (
    <View style={styles.container1}>
      <DropDownList items={names} onSelect={handleSelect} />
      {selectedName ? (
        <Text style={styles.selectedText}>Selected: {selectedName}</Text>
      ) : null}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { width: "100%" },
  dropDownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dropDownButtonText: { fontSize: 16 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  itemText: { fontSize: 16 },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  selectedText: { fontSize: 18, marginTop: 20 },
});
