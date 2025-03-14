import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { productConfigurationService } from "../../services/productConfigurationService";
import { projectService } from "../../services/projectService";
import MockupDetailsGatheringStyles from "../../Styles/Screens/Exporter/MockupDetailsGatheringStyle";
import { CUTTING_STYLE, PROJECT_STATUS, STORAGE_KEYS } from "../../utils/constants";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = MockupDetailsGatheringStyles(width, height);

// Hardcoded sizes
const SIZES = [
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' }
];

// Logo numbers array (0-5)
const LOGO_NUMBERS = Array.from({ length: 6 }, (_, i) => ({
  label: i.toString(),
  value: i.toString()
}));

const MockupDetailsGathering = ({ navigation, route }) => {
  const [productType, setProductType] = useState(null);
  const [openProductType, setOpenProductType] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  const [fabricType, setFabricType] = useState(null);
  const [openFabricType, setOpenFabricType] = useState(false);
  const [categories, setCategories] = useState([]);

  const [subFabricType, setSubFabricType] = useState(null);
  const [openSubFabricType, setOpenSubFabricType] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const [sizes, setSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState(SIZES);
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const [numberOfLogos, setNumberOfLogos] = useState("0");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [logoPositions, setLogoPositions] = useState([]);
  const [printingMethods, setPrintingMethods] = useState([]);

  const [patternRequired, setPatternRequired] = useState(false);
  const [labelsRequired, setLabelsRequired] = useState(false);
  const [tagCardsRequired, setTagCardsRequired] = useState(false);
  const [packagingRequired, setPackagingRequired] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  // Add new state to track when data is loaded
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Function to find matching value case-insensitively
  const findMatchingValue = (value, options) => {
    if (!value || !options || !options.length) return null;

    return options.find(option =>
      option.toLowerCase() === value.toLowerCase()
    ) || null;
  };

  // Fetch product configuration data
  const fetchProductConfigurations = async () => {
    try {
      setLoading(true);

      // Check if data exists in storage
      const storedData = await productConfigurationService.getFromStorage(STORAGE_KEYS.PRODUCT_CONFIGURATIONS);

      if (storedData) {
        // Use stored data
        setProductTypes(storedData.productTypes);
        setPrintingMethods(storedData.printingMethods);
        setLogoPositions(storedData.logoPositions);
        setIsDataLoaded(true);
      } else {
        // If no stored data, fetch from API
        const data = await productConfigurationService.fetchAllProductConfigurations();

        // Store the fetched data
        await productConfigurationService.saveToStorage(STORAGE_KEYS.PRODUCT_CONFIGURATIONS, data);

        // Update state with fetched data
        setProductTypes(data.productTypes);
        setPrintingMethods(data.printingMethods);
        setLogoPositions(data.logoPositions);
        setIsDataLoaded(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product configurations. Please try again.');
      console.error('Error fetching product configurations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories when product type changes
  const fetchCategories = async (shirtType) => {
    try {
      setLoading(true);
      const categories = await productConfigurationService.getCategories(shirtType);
      setCategories(categories);

      let newFabricType = null;
      let fabricTypeChanged = true;

      // Auto-select fabric type if it exists in the route params
      if (route.params?.data?.fabricType) {
        const matchingFabricType = findMatchingValue(route.params.data.fabricType, categories);
        if (matchingFabricType) {
          newFabricType = matchingFabricType;
          fabricTypeChanged = newFabricType !== fabricType;
        }
      } else {
        // Check if current fabric type is in the new categories
        const matchingCurrentFabric = findMatchingValue(fabricType, categories);
        if (matchingCurrentFabric) {
          newFabricType = fabricType; // Keep current fabric type
          fabricTypeChanged = false;
        }
      }

      // Update fabric type
      setFabricType(newFabricType);

      // If fabric type changed or was reset, clear subcategories
      if (fabricTypeChanged) {
        setSubFabricType(null);
        setSubCategories([]);
      } else if (newFabricType) {
        // If fabric type didn't change and is valid, fetch subcategories
        fetchSubcategories(newFabricType);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      Alert.alert('Error', 'Failed to fetch fabric types. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories when fabric type changes
  const fetchSubcategories = async (category) => {
    try {
      setLoading(true);
      const subCategories = await productConfigurationService.getSubcategories(category);
      setSubCategories(subCategories);

      // Auto-select sub-fabric type if it exists in the route params
      if (route.params?.data?.fabricSubType) {
        const matchingSubFabricType = findMatchingValue(route.params.data.fabricSubType, subCategories);
        if (matchingSubFabricType) {
          setSubFabricType(matchingSubFabricType);
        } else {
          // Reset sub-fabric type if no match found
          setSubFabricType(null);
        }
      } else {
        // Reset sub-fabric type when manually changing fabric type
        setSubFabricType(null);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data loading 
  useEffect(() => {
    fetchProductConfigurations();
  }, []);

  // Auto-select product type when data is loaded and productTypes are available
  useEffect(() => {
    console.log("isDataLoaded", isDataLoaded)
    console.log("productTypes", productTypes)
    console.log("route.params.data.productType", route.params?.data)
    if (isDataLoaded && productTypes.length > 0 && route.params?.data?.productType) {
      console.log(route.params.data.productType)
      const matchingProductType = findMatchingValue(route.params.data.productType, productTypes);
      if (matchingProductType) {
        setProductType(matchingProductType);
        // fetchCategories will be called by the next useEffect when productType changes
      }
    }
  }, [isDataLoaded, productTypes, route.params?.data?.productType]);

  // Fetch categories when product type changes
  useEffect(() => {
    if (productType) {
      fetchCategories(productType);
    }
  }, [productType]);

  // Fetch subcategories when fabric type changes
  useEffect(() => {
    if (fabricType) {
      fetchSubcategories(fabricType);
    }
  }, [fabricType]);

  // Pre-select other non-cascading values after data is loaded
  useEffect(() => {
    if (isDataLoaded && route.params?.data) {
      const data = route.params.data;

      // Pre-select sizes
      if (data.sizes && Array.isArray(data.sizes)) {
        const validSizes = data.sizes.filter(size =>
          // Only include sizes that have a valid size, a non-empty quantity, and match one of our available sizes
          size.size &&
          size.quantity !== null &&
          size.quantity !== undefined &&
          size.quantity !== "" &&
          parseInt(size.quantity) > 0 &&
          SIZES.some(s => s.value === size.size)
        );
        setSizes(validSizes);
        setAvailableSizes(SIZES.filter(size =>
          !validSizes.some(s => s.size === size.value)
        ));
      }

      // Pre-select logo details
      if (data.numberOfLogos) {
        setNumberOfLogos(data.numberOfLogos.toString());
        if (data.logoDetails && Array.isArray(data.logoDetails)) {
          const positions = data.logoDetails.map(detail =>
            findMatchingValue(detail.position, logoPositions) || ""
          );
          const types = data.logoDetails.map(detail =>
            findMatchingValue(detail.type, printingMethods) || ""
          );
          setSelectedPositions(positions);
          setSelectedTypes(types);
        }
      }

      // Pre-select switches
      setPatternRequired(data.patternRequired === "true" || data.patternRequired === true);
      setLabelsRequired(data.labelsRequired === "true" || data.labelsRequired === true);
      setTagCardsRequired(data.tagCardsRequired === "true" || data.tagCardsRequired === true);
      setPackagingRequired(data.packagingRequired === "true" || data.packagingRequired === true);
    }
  }, [isDataLoaded]);

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
    setNumberOfLogos(value);

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

  const handleSubmit = async () => {
    // Validate required fields
    if (!productType) {
      Alert.alert("Error", "Please select a product type");
      return;
    }
    if (!fabricType) {
      Alert.alert("Error", "Please select a fabric type");
      return;
    }
    if (!subFabricType) {
      Alert.alert("Error", "Please select a sub fabric type");
      return;
    }
    if (labelsRequired === undefined) {
      Alert.alert("Error", "Please specify if labels are required");
      return;
    }
    if (packagingRequired === undefined) {
      Alert.alert("Error", "Please specify if packaging is required");
      return;
    }
    if (patternRequired === undefined) {
      Alert.alert("Error", "Please specify if pattern is required");
      return;
    }
    if (tagCardsRequired === undefined) {
      Alert.alert("Error", "Please specify if tag cards are required");
      return;
    }
    if (sizes.length === 0) {
      Alert.alert("Error", "Please add at least one size");
      return;
    }
    if (parseInt(numberOfLogos) > 0 && (!selectedPositions.length || selectedPositions.filter(pos => pos).length !== parseInt(numberOfLogos))) {
      Alert.alert("Error", "Please select positions for all logos");
      return;
    }
    if (parseInt(numberOfLogos) > 0 && (!selectedTypes.length || selectedTypes.filter(type => type).length !== parseInt(numberOfLogos))) {
      Alert.alert("Error", "Please select types for all logos");
      return;
    }

    try {
      setLoading(true);

      const projectData = {
        userId: 23, // TODO: Get actual user ID from auth context
        status: PROJECT_STATUS.DRAFT,
        shirtType: productType,
        fabricCategory: fabricType,
        fabricSubCategory: subFabricType,
        cuttingStyle: sizes.reduce((total, size) => total + parseInt(size.quantity), 0) > 10
          ? CUTTING_STYLE.SUBLIMATION
          : CUTTING_STYLE.REGULAR,
        labelsRequired,
        numberOfLogos: parseInt(numberOfLogos) || undefined,
        logoDetails: Array.from({ length: numberOfLogos || 0 }, (_, i) => ({
          logoPosition: selectedPositions[i] || undefined,
          printingStyle: selectedTypes[i] || undefined
        })),
        packagingRequired,
        patternRequired,
        tagCardsRequired,
        sizes: sizes.map(size => ({
          fabricSize: size.size,
          quantity: parseInt(size.quantity)
        }))
      };
      console.log(projectData)
      const response = await projectService.createProject(projectData);
      console.log("Response:", response);

      if (response.success) {
        Alert.alert("Success", "Project created successfully! Cost: " + response.data.totalEstimatedCost);
        navigation.navigate("CostEstimationBreakdown", { projectId: response.data.id });
      } else {
        Alert.alert("Error", response.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      Alert.alert("Error", "Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={[{ key: "form" }]}
      renderItem={() => (
        <View style={styles.formContainer}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text style={styles.label}>Product Type</Text>
              <DropDownPicker
                open={openProductType}
                value={productType}
                items={productTypes.map(type => ({ label: type, value: type }))}
                setOpen={setOpenProductType}
                setValue={setProductType}
                containerStyle={styles.dropdown}
                placeholder="Select product type"
                listMode="SCROLLVIEW"
                zIndex={10000}
              />
              <Text style={styles.label}>Fabric Type</Text>
              <DropDownPicker
                open={openFabricType}
                value={fabricType}
                items={categories.map(category => ({ label: category, value: category }))}
                setOpen={setOpenFabricType}
                setValue={setFabricType}
                containerStyle={styles.dropdown}
                placeholder="Select fabric type"
                listMode="SCROLLVIEW"
                zIndex={5000}
              />
              {fabricType && subCategories.length > 0 && (
                <>
                  <Text style={styles.label}>Sub-Fabric Type</Text>
                  <DropDownPicker
                    open={openSubFabricType}
                    value={subFabricType}
                    items={subCategories.map(sub => ({ label: sub, value: sub }))}
                    setOpen={setOpenSubFabricType}
                    setValue={setSubFabricType}
                    containerStyle={styles.dropdown}
                    placeholder="Select sub-fabric type"
                    listMode="SCROLLVIEW"
                    zIndex={10000}
                  />
                </>
              )}
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
                placeholder="Select desired size"
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
                    selectedValue={numberOfLogos}
                    onValueChange={handleNumberOfLogosChange}
                    style={styles.picker}
                  >
                    {LOGO_NUMBERS.map((item) => (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
                {Array.from({ length: parseInt(numberOfLogos) }, (_, index) => (
                  <View key={index} style={styles.dropdownRow}>
                    <Text style={styles.label01}>Logo {index + 1} Position</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedPositions[index]}
                        onValueChange={(value) =>
                          handlePositionChange(value, index)
                        }
                        style={styles.picker}
                        prompt="Select position"
                      >
                        <Picker.Item
                          label="Select position..."
                          value=""
                        />
                        {logoPositions.map((position, idx) => (
                          <Picker.Item
                            key={idx}
                            label={position}
                            value={position}
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
                        prompt="Select type"
                      >
                        <Picker.Item
                          label="Select type..."
                          value=""
                        />
                        {printingMethods.map((method, idx) => (
                          <Picker.Item
                            key={idx}
                            label={method}
                            value={method}
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
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonCalculateCost}
              >
                <Text style={styles.buttonTextculateCost}>Calculate Cost</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    />
  );
};

export default MockupDetailsGathering;