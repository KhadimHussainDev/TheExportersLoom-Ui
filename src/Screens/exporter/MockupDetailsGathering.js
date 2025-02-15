import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Switch,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import MockupDetailsGatheringStyles from "../../Styles/Screens/Exporter/MockupDetailsGatheringStyle";
import {
  fabricTypes,
  labelTypes,
  logoNumbers,
  packagingTypes,
  positionOptions,
  productTypes,
  sizeTypes,
  typeOptions,
} from "../../utils/Data/CostCalculation";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = MockupDetailsGatheringStyles(width, height);

const MockupDetailsGathering = ({ route, navigation }) => {
  const { data } = route.params;

  const [productType, setProductType] = useState(productTypes[0].value); // Sweat shirt
  const [openProductType, setOpenProductType] = useState(false);

  const [fabricType, setFabricType] = useState(fabricTypes[0].value); // Cotton
  const [openFabricType, setOpenFabricType] = useState(false);

  const [sizes, setSizes] = useState([
    { size: "M", quantity: 50 },
    { size: "S", quantity: 70 },
  ]);
  const [availableSizes, setAvailableSizes] = useState(
    sizeTypes.filter((size) => size.value !== "M" && size.value !== "S")
  );
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const [numberOfLogos, setNumberOfLogos] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState(["Chest"]);
  const [selectedTypes, setSelectedTypes] = useState(["Screen Printing"]);

  const [patternRequired, setPatternRequired] = useState(true);
  const [labelsRequired, setLabelsRequired] = useState(false);
  const [labelType, setLabelType] = useState(null);
  const [tagCardsRequired, setTagCardsRequired] = useState(true);
  const [packagingRequired, setPackagingRequired] = useState(false);
  const [packagingType, setPackagingType] = useState(null);

  const [openLabelType, setOpenLabelType] = useState(false);
  const [openPackagingType, setOpenPackagingType] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleNumberOfLogosChange = (value) => {
    const num = parseInt(value, 10);
    setNumberOfLogos(num);

    // Reset positions and types for new dropdowns
    setSelectedPositions(Array(num).fill(""));
    setSelectedTypes(Array(num).fill(""));
  };

  const handlePositionChange = (value, index) => {
    const updatedPositions = [...selectedPositions];
    updatedPositions[index] = value;
    setSelectedPositions(updatedPositions);
  };

  const handleTypeChange = (value, index) => {
    const updatedTypes = [...selectedTypes];
    updatedTypes[index] = value;
    setSelectedTypes(updatedTypes);
  };

  const handleCalculateCost = async () => {
    const formData = {
      productType,
      fabricType,
      sizes,
      numberOfLogos,
      logoDetails: selectedPositions.map((position, index) => ({
        position,
        type: selectedTypes[index],
      })),
      patternRequired,
      labelsRequired,
      labelType: labelsRequired ? labelType : null,
      tagCardsRequired,
      packagingRequired,
      packagingType: packagingRequired ? packagingType : null,
    };

    console.log("Form Data:", formData);
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
    Alert.alert("Success", "Cost Calculated Successfully!");
    navigation.navigate("CostEstimationBreakdown")
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
            placeholder="Select product type"
            listMode="SCROLLVIEW"
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
            placeholder="Select fabric type"
            listMode="SCROLLVIEW"
            zIndex={5000}
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
            placeholder="Select desire size"
            listMode="SCROLLVIEW"
            zIndex={3000}
          />
          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={addSize} style={styles.button}>
            <Text style={styles.buttonText}>Add Size</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.label}>Number of Logos</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={numberOfLogos.toString()}
                onValueChange={handleNumberOfLogosChange}
                style={styles.picker}
              >
                {logoNumbers.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
            {Array.from({ length: numberOfLogos }, (_, index) => (
              <View key={index} style={styles.dropdownRow}>
                <Text style={styles.label01}>Logo {index + 1} Position</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedPositions[index]}
                    onValueChange={(value) =>
                      handlePositionChange(value, index)
                    }
                    style={styles.picker}
                  >
                    {positionOptions.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
                <Text style={styles.label01}>Logo {index + 1} Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedTypes[index]}
                    onValueChange={(value) => handleTypeChange(value, index)}
                    style={styles.picker}
                  >
                    {typeOptions.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.label}>Pattern Required</Text>
          <Switch
            value={patternRequired}
            onValueChange={setPatternRequired}
            thumbColor={
              patternRequired
                ? styles.switchOnThumbColor
                : styles.switchOFThumbColor
            }
          />
          <Text style={styles.label}>Labels Required</Text>
          <Switch
            value={labelsRequired}
            onValueChange={setLabelsRequired}
            thumbColor={
              labelsRequired
                ? styles.switchOnThumbColor
                : styles.switchOFThumbColor
            }
          />
          {labelsRequired && (
            <DropDownPicker
              open={openLabelType}
              value={labelType}
              items={labelTypes}
              setOpen={setOpenLabelType}
              setValue={setLabelType}
              containerStyle={styles.dropdown}
              placeholder="Select desire label"
              listMode="SCROLLVIEW"
              zIndex={5000}
            />
          )}
          <Text style={styles.label}>Tag Cards Required</Text>
          <Switch
            value={tagCardsRequired}
            onValueChange={setTagCardsRequired}
            thumbColor={
              tagCardsRequired
                ? styles.switchOnThumbColor
                : styles.switchOFThumbColor
            }
          />
          <Text style={styles.label}>Packaging Required</Text>
          <Switch
            value={packagingRequired}
            onValueChange={setPackagingRequired}
            thumbColor={
              packagingRequired
                ? styles.switchOnThumbColor
                : styles.switchOFThumbColor
            }
          />
          {packagingRequired && (
            <DropDownPicker
              open={openPackagingType}
              value={packagingType}
              items={packagingTypes}
              setOpen={setOpenPackagingType}
              setValue={setPackagingType}
              containerStyle={styles.dropdown}
              placeholder="Select desire Packaging"
              listMode="SCROLLVIEW"
              zIndex={700}
            />
          )}
          <TouchableOpacity
            onPress={handleCalculateCost}
            style={styles.buttonCalculateCost}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonTextculateCost}>Caclulate Cost</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default MockupDetailsGathering;