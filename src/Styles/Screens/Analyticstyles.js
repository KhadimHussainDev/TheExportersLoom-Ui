import { StyleSheet } from "react-native";

const Analyticstyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      marginBottom: 16,
    },
    textRow: {
      width: "100%",
      marginBottom: 70,
      alignItems: "center",
    },
  });

export default Analyticstyles;
