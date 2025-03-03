import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import RequestCard from "../../components/common/RequestCard";
import ModuleData from "../../utils/Data/ModuleData";
import ExporterRequest from "../../utils/Data/ExporterRequest";

const ExporterRequestList = () => {
  const requestData = ExporterRequest.map((request) => {
    const module = ModuleData.find((m) => m.id === request.moduleId);
    return { module, request };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={requestData}
        keyExtractor={(item) => item.request.requestId}
        renderItem={({ item }) => (
          <RequestCard module={item.module} request={item.request} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E2FDFF", // Exact background color from image
  },
  container: {
    flex: 1,
    backgroundColor: "#E2FDFF", // White container for request list
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    marginTop: -10, // Adjusted for smooth transition from header
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ExporterRequestList;
