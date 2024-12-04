import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const RequirementForm = () => {
  const [productType, setProductType] = useState(null);
  const [fabricType, setFabricType] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([
    { label: "XXS", value: "XXS" },
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
    { label: "3XL", value: "3XL" },
    { label: "4XL", value: "4XL" },
    { label: "5XL", value: "5XL" },
    { label: "6XL", value: "6XL" },
  ]);
  const [patternRequired, setPatternRequired] = useState(false);
  const [numLogos, setNumLogos] = useState(0);
  const [logos, setLogos] = useState([]);
  const [labelsRequired, setLabelsRequired] = useState(false);
  const [labelType, setLabelType] = useState(null);
  const [tagCardsRequired, setTagCardsRequired] = useState(false);
  const [packagingRequired, setPackagingRequired] = useState(false);
  const [packagingType, setPackagingType] = useState(null);

  const [openProductType, setOpenProductType] = useState(false);
  const [openFabricType, setOpenFabricType] = useState(false);
  const [openLogoPosition, setOpenLogoPosition] = useState([]);
  const [openLogoType, setOpenLogoType] = useState([]);
  const [openNumLogos, setOpenNumLogos] = useState(false);
  const [openLabelType, setOpenLabelType] = useState(false);
  const [openPackagingType, setOpenPackagingType] = useState(false);
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setOpenLogoPosition(new Array(numLogos).fill(false));
    setOpenLogoType(new Array(numLogos).fill(false));
    setLogos(new Array(numLogos).fill({ position: null, type: null }));
  }, [numLogos]);

  const addSize = () => {
    if (selectedSize && quantity) {
      setSizes([...sizes, { size: selectedSize, quantity }]);
      setAvailableSizes(
        availableSizes.filter((size) => size.value !== selectedSize)
      );
      setSelectedSize(null);
      setQuantity("");
      setOpenSizeDropdown(false);
    }
  };

  const handleSubmit = () => {
    const totalQuantity = sizes.reduce(
      (sum, { quantity }) => sum + Number(quantity),
      0
    );
    const totalCost = calculateTotalCost(totalQuantity);
    let logoDetails = "";
    logos.forEach((logo, index) => {
      logoDetails += `Logo ${index + 1}: Position - ${logo.position}, Type - ${
        logo.type
      }\n`;
    });
    Alert.alert(
      "Project Details",
      `Product: ${productType}\nFabric: ${fabricType}\nTotal Quantity: ${totalQuantity}\nTotal Cost: ${totalCost}\nNumber of Logos: ${numLogos}\n${logoDetails}`,
      [{ text: "OK" }]
    );
  };

  const calculateTotalCost = (totalQuantity) => {
    const baseCost = 100; // Example base cost per item
    return totalQuantity * baseCost;
  };

  const handleLogoChange = (index, field, value) => {
    const updatedLogos = logos.map((logo, i) =>
      i === index ? { ...logo, [field]: value } : logo
    );
    setLogos(updatedLogos);
  };

  return (
    <FlatList
      data={[{ key: "form" }]}
      renderItem={() => (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Product Type</Text>
          <DropDownPicker
            open={openProductType}
            value={productType}
            items={productTypes}
            setOpen={setOpenProductType}
            setValue={setProductType}
            containerStyle={styles.dropdown}
            zIndex={5000}
          />

          <Text style={styles.label}>Fabric Type</Text>
          <DropDownPicker
            open={openFabricType}
            value={fabricType}
            items={fabricTypes}
            setOpen={setOpenFabricType}
            setValue={setFabricType}
            containerStyle={styles.dropdown}
            zIndex={4000}
          />

          <Text style={styles.label}>Sizes and Quantities</Text>
          <FlatList
            data={sizes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.sizeContainer}>
                <Text>{item.size}</Text>
                <Text>{item.quantity}</Text>
              </View>
            )}
          />
          <DropDownPicker
            open={openSizeDropdown}
            value={selectedSize}
            items={availableSizes}
            setOpen={setOpenSizeDropdown}
            setValue={setSelectedSize}
            containerStyle={styles.dropdown}
            zIndex={3000}
          />
          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button title="Add Size" onPress={addSize} />

          <Text style={styles.label}>Pattern Required</Text>
          <Switch value={patternRequired} onValueChange={setPatternRequired} />

          <Text style={styles.label}>Number of Logos</Text>
          <DropDownPicker
            open={openNumLogos}
            value={numLogos}
            items={[
              { label: "0", value: 0 },
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
            ]}
            setOpen={setOpenNumLogos}
            setValue={setNumLogos}
            containerStyle={styles.dropdown}
            zIndex={2500}
          />

          {logos.map((logo, index) => (
            <View key={index}>
              <Text style={styles.label}>Logo {index + 1} Position</Text>
              <DropDownPicker
                open={openLogoPosition[index]}
                value={logo.position}
                items={logoPositions}
                setOpen={() => {
                  const newOpenState = [...openLogoPosition];
                  newOpenState[index] = !openLogoPosition[index];
                  setOpenLogoPosition(newOpenState);
                }}
                setValue={(value) => handleLogoChange(index, "position", value)}
                containerStyle={styles.dropdown}
                zIndex={2000 - index * 100}
              />
              <Text style={styles.label}>Logo {index + 1} Type</Text>
              <DropDownPicker
                open={openLogoType[index]}
                value={logo.type}
                items={[...printingTypes, ...embroideryTypes]}
                setOpen={() => {
                  const newOpenState = [...openLogoType];
                  newOpenState[index] = !openLogoType[index];
                  setOpenLogoType(newOpenState);
                }}
                setValue={(value) => handleLogoChange(index, "type", value)}
                containerStyle={styles.dropdown}
                zIndex={1500 - index * 100}
              />
            </View>
          ))}

          <Text style={styles.label}>Labels Required</Text>
          <Switch value={labelsRequired} onValueChange={setLabelsRequired} />
          {labelsRequired && (
            <DropDownPicker
              open={openLabelType}
              value={labelType}
              items={labelTypes}
              setOpen={setOpenLabelType}
              setValue={setLabelType}
              containerStyle={styles.dropdown}
              zIndex={800}
            />
          )}

          <Text style={styles.label}>Tag Cards Required</Text>
          <Switch
            value={tagCardsRequired}
            onValueChange={setTagCardsRequired}
          />

          <Text style={styles.label}>Packaging Required</Text>
          <Switch
            value={packagingRequired}
            onValueChange={setPackagingRequired}
          />
          {packagingRequired && (
            <DropDownPicker
              open={openPackagingType}
              value={packagingType}
              items={packagingTypes}
              setOpen={setOpenPackagingType}
              setValue={setPackagingType}
              containerStyle={styles.dropdown}
              zIndex={700}
            />
          )}

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    />
  );
};

const productTypes = [
  { label: "Shirt", value: "Shirt" },
  { label: "Pants", value: "Pants" },
  { label: "Jacket", value: "Jacket" },
  // Add more product types as needed
];

const fabricTypes = [
  { label: "Cotton", value: "Cotton" },
  { label: "Polyester", value: "Polyester" },
  // Add more fabric types as needed
];

const logoPositions = [
  { label: "Chest", value: "Chest" },
  { label: "Back", value: "Back" },
  // Add more logo positions as needed
];

const printingTypes = [
  { label: "Screen Printing", value: "Screen Printing" },
  { label: "Digital Printing", value: "Digital Printing" },
  // Add more printing types as needed
];

const embroideryTypes = [
  { label: "Standard Embroidery", value: "Standard Embroidery" },
  { label: "3D Embroidery", value: "3D Embroidery" },
  // Add more embroidery types as needed
];

const labelTypes = [
  { label: "Standard Label", value: "Standard Label" },
  { label: "Custom Label", value: "Custom Label" },
  // Add more label types as needed
];

const packagingTypes = [
  { label: "Standard Packaging", value: "Standard Packaging" },
  { label: "Custom Packaging", value: "Custom Packaging" },
  // Add more packaging types as needed
];
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 3,
  },
  label: { marginBottom: 10, fontWeight: "bold" },
  dropdown: { height: 40, marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
export default RequirementForm;
