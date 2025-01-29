// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// const ModuleDescription = () => (
//   <View style={styles.moduleContainer}>
//     <Text style={styles.moduleTitle}>📦 Module Description</Text>
//     <View style={styles.moduleContent}>
//       <Text style={styles.moduleHeading}>Stitching Module</Text>
//       <Text style={styles.moduleSubHeading}>Status: Not Assigned</Text>
//       <Text style={styles.moduleSubHeading}>Total Cost: 50K</Text>
//       <Text style={styles.moduleDetails}>
//         Create lorem ipsum — Check your app or web is working for properly with
//         different alphabets and character sets. Create Arabic, Hindi, Chinese
//         and more, filler text to better test your app or web.
//       </Text>
//     </View>
//   </View>
// );

// const RatingStars = ({ rating }) => (
//   <View style={styles.rating}>
//     {[...Array(5)].map((_, index) => (
//       <Icon
//         key={index}
//         name="star"
//         size={14}
//         color={index < rating ? "gold" : "#ccc"}
//       />
//     ))}
//   </View>
// );

// const ManufacturerCard = ({
//   name,
//   profileImage,
//   distance,
//   price,
//   rating,
//   days,
// }) => (
//   <View style={styles.card}>
//     <View style={styles.cardContent}>
//       <View style={styles.profileSection}>
//         <Image source={profileImage} style={styles.profileImage} />
//         <View>
//           <Text style={styles.name}>{name}</Text>
//           <RatingStars rating={rating} />
//         </View>
//       </View>

//       <View style={styles.priceDistanceSection}>
//         <Text style={styles.price}>${price}</Text>
//         <Text style={styles.distance}>{distance} km</Text>
//       </View>

//       <View style={styles.chatSection}>
//         <TouchableOpacity style={styles.chatButton}>
//           <Icon name="chatbox-ellipses-outline" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.days}>Days: {days}</Text>
//       </View>
//     </View>
//   </View>
// );

// const SortButton = ({ label, isActive, onPress }) => (
//   <TouchableOpacity
//     style={[styles.sortButton, isActive && { backgroundColor: "#013240" }]}
//     onPress={onPress}
//   >
//     <Text style={styles.buttonText}>{label}</Text>
//   </TouchableOpacity>
// );

// const ManufacturerListScreen = () => {
//   const [activeButtons, setActiveButtons] = useState({});
//   const [data, setData] = useState([
//     {
//       id: "1",
//       name: "Jamal",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 2,
//       price: 4.15,
//       rating: 5,
//       days: 7,
//     },
//     {
//       id: "2",
//       name: "Aisha",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 3,
//       price: 3.75,
//       rating: 4,
//       days: 10,
//     },
//     {
//       id: "3",
//       name: "Omar",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 5,
//       price: 6.0,
//       rating: 5,
//       days: 3,
//     },
//     {
//       id: "4",
//       name: "Sara",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 1.5,
//       price: 3.2,
//       rating: 4,
//       days: 8,
//     },
//     {
//       id: "5",
//       name: "Ali",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 4,
//       price: 5.5,
//       rating: 3,
//       days: 14,
//     },
//     {
//       id: "6",
//       name: "Zain",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 6,
//       price: 4.8,
//       rating: 5,
//       days: 5,
//     },
//     {
//       id: "7",
//       name: "Fatima",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 2.5,
//       price: 4.2,
//       rating: 5,
//       days: 9,
//     },
//     {
//       id: "8",
//       name: "Hassan",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 3.5,
//       price: 5.1,
//       rating: 4,
//       days: 6,
//     },
//     {
//       id: "9",
//       name: "Mariam",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 2.2,
//       price: 3.6,
//       rating: 5,
//       days: 11,
//     },
//     {
//       id: "10",
//       name: "Bilal",
//       profileImage: require("./src/assets/images/Profile.png"),
//       distance: 4.5,
//       price: 4.9,
//       rating: 4,
//       days: 7,
//     },
//   ]);

//   const toggleButton = (key) => {
//     setActiveButtons((prev) => {
//       const updated = { ...prev, [key]: !prev[key] };
//       applySorting(updated);
//       return updated;
//     });
//   };

//   const applySorting = (buttons) => {
//     let sortedData = [...data];

//     if (buttons.price) sortedData.sort((a, b) => a.price - b.price);
//     if (buttons.distance) sortedData.sort((a, b) => a.distance - b.distance);
//     if (buttons.rating) sortedData.sort((a, b) => a.rating - b.rating);
//     if (buttons.time) sortedData.sort((a, b) => a.days - b.days);

//     if (!Object.values(buttons).some(Boolean)) {
//       sortedData = [...data];
//     }

//     setData(sortedData);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <ModuleDescription />
//       <View style={styles.buttonRow}>
//         {["price", "distance", "rating", "time"].map((key) => (
//           <SortButton
//             key={key}
//             label={key.charAt(0).toUpperCase() + key.slice(1)}
//             isActive={activeButtons[key]}
//             onPress={() => toggleButton(key)}
//           />
//         ))}
//       </View>

//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <ManufacturerCard
//             name={item.name}
//             profileImage={item.profileImage}
//             distance={item.distance}
//             price={item.price.toFixed(2)}
//             rating={item.rating}
//             days={item.days}
//           />
//         )}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   list: { paddingHorizontal: 15, paddingBottom: 10 },
//   card: {
//     flexDirection: "row",
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     elevation: 3,
//   },
//   cardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   profileSection: { flexDirection: "row", alignItems: "center", flex: 1 },
//   profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   name: { fontSize: 16, fontWeight: "bold", marginBottom: 2 },
//   rating: { flexDirection: "row", marginBottom: 5 },
//   priceDistanceSection: { alignItems: "flex-end", marginHorizontal: 10 },
//   price: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 5 },
//   distance: { fontSize: 14, color: "#666" },
//   chatSection: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 15,
//   },
//   chatButton: { backgroundColor: "#013240", borderRadius: 15, padding: 12 },
//   days: { marginTop: 5, fontSize: 12, color: "#666" },
//   moduleContainer: {
//     marginTop: 10,
//     padding: 15,
//     backgroundColor: "#eafaff",
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   moduleTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
//   moduleContent: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#fff",
//   },
//   moduleHeading: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
//   moduleSubHeading: { fontSize: 12, fontWeight: "bold", marginLeft: 30 },
//   moduleDetails: { marginTop: 10, fontSize: 12, color: "#666" },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10,
//   },
//   sortButton: {
//     padding: 8,
//     paddingHorizontal: 15,
//     borderRadius: 15,
//     backgroundColor: "#ddd",
//   },
//   buttonText: { fontSize: 14, fontWeight: "bold", color: "#333" },
// });

// const App = () => {
//   return <ManufacturerListScreen />;
// };

// export default App;
