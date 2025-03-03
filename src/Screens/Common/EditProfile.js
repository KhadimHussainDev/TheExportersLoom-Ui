import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import EditProfileStyles from "../../Styles/Screens/EditProfileStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = EditProfileStyles(width, height);

const EditProfile = ({
  isModalVisible,
  setIsModalVisible,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  username,
  setUsername,
  companyName,
  setCompanyName,
  cnic,
  setCnic,
  aboutMe,
  setAboutMe,
}) => {
  const [localUsername, setLocalUsername] = useState(username);
  const [localCompanyName, setLocalCompanyName] = useState(companyName);
  const [localCnic, setLocalCnic] = useState(cnic);
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);
  const [localAddress, setLocalAddress] = useState(address);
  const [localAboutMe, setLocalAboutMe] = useState(aboutMe);

  const handleSave = () => {
    setUsername(localUsername);
    setCompanyName(localCompanyName);
    setCnic(localCnic);
    setName(localName);
    setEmail(localEmail);
    setPhone(localPhone);
    setAddress(localAddress);
    setAboutMe(localAboutMe);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!"
    );
    setIsModalVisible(false);
  };

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalTitle}>Edit Your Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={localUsername}
          onChangeText={setLocalUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={localCompanyName}
          onChangeText={setLocalCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="National ID Number"
          value={localCnic}
          onChangeText={setLocalCnic}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={localName}
          onChangeText={setLocalName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={localEmail}
          onChangeText={setLocalEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={localPhone}
          onChangeText={setLocalPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={localAddress}
          onChangeText={setLocalAddress}
        />
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="About Me"
          value={localAboutMe}
          onChangeText={setLocalAboutMe}
          multiline
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: "red" }]}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfile;
