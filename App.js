import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

const App = () => {
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    price: "",
    time: "",
    details: "",
  });
  const [submittedProject, setSubmittedProject] = useState(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { user: userName, userType, text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  const submitProjectDetails = () => {
    if (projectDetails.price && projectDetails.time && projectDetails.details) {
      setSubmittedProject({ ...projectDetails, accepted: false });
      setProjectDetails({ price: "", time: "", details: "" });
    }
  };

  const acceptProject = () => {
    setSubmittedProject((prev) => ({ ...prev, accepted: true }));
  };

  const rejectProject = () => {
    setSubmittedProject(null);
  };

  const handleLogout = () => {
    setUserType(null);
    setUserName("");
    setMessages([]);
    setProjectDetails({ price: "", time: "", details: "" });
    setSubmittedProject(null);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {!userType ? (
        <View style={{ alignItems: "center" }}>
          <Text>Enter Your Name</Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            style={{
              borderWidth: 1,
              width: 200,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => setUserType("Exporter")}
            style={{ marginBottom: 10, padding: 10, backgroundColor: "blue" }}
          >
            <Text style={{ color: "white" }}>Login as Exporter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("Manufacturer")}
            style={{ padding: 10, backgroundColor: "green" }}
          >
            <Text style={{ color: "white" }}>Login as Manufacturer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor:
                  item.userType === userType ? "#cce5ff" : "#f0f0f0",
                alignSelf:
                  item.userType === userType ? "flex-end" : "flex-start",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.user}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
          ListHeaderComponent={
            <View>
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Back to Login
                </Text>
              </TouchableOpacity>
              {submittedProject && (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "lightgray",
                    marginBottom: 10,
                  }}
                >
                  <Text>Project: {submittedProject.details}</Text>
                  <Text>Price: ${submittedProject.price}</Text>
                  <Text>Time: {submittedProject.time} days</Text>
                  {!submittedProject.accepted ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={acceptProject}
                        style={{
                          backgroundColor: "green",
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: "white" }}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={rejectProject}
                        style={{
                          backgroundColor: "red",
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: "white" }}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={{ color: "green" }}>Project Accepted</Text>
                  )}
                </View>
              )}
            </View>
          }
          ListFooterComponent={
            <View>
              <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message..."
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={{
                  backgroundColor: "blue",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Send
                </Text>
              </TouchableOpacity>
              {userType === "Exporter" && !submittedProject && (
                <View>
                  <TextInput
                    placeholder="Project Details"
                    value={projectDetails.details}
                    onChangeText={(text) =>
                      setProjectDetails((prev) => ({ ...prev, details: text }))
                    }
                    style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
                  />
                  <TextInput
                    placeholder="Price"
                    value={projectDetails.price}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setProjectDetails((prev) => ({ ...prev, price: text }))
                    }
                    style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
                  />
                  <TextInput
                    placeholder="Time (days)"
                    value={projectDetails.time}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setProjectDetails((prev) => ({ ...prev, time: text }))
                    }
                    style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
                  />
                  <TouchableOpacity
                    onPress={submitProjectDetails}
                    style={{
                      backgroundColor: "orange",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Submit Project
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          }
        />
      )}
    </View>
  );
};

export default App;
