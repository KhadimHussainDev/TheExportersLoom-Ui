import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { createProfileInfoStyles } from "../../Styles/Components/ProfileInfoStyles";

const ProfileInfo = ({ name, email, phone, address, width, height, showPlaceholders = false }) => {
  const styles = createProfileInfoStyles(width, height);

  const renderField = (value, placeholder, icon) => {
    const isEmpty = !value || value.trim() === '';

    if (isEmpty && showPlaceholders) {
      return (
        <View style={styles.placeholderContainer}>
          {icon && <Ionicons name={icon} size={16} color="#999" style={styles.placeholderIcon} />}
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
      );
    }

    return <Text style={isEmpty ? styles.emptyField : styles[icon === 'person' ? 'name' : 'infoText']}>{value}</Text>;
  };

  return (
    <View style={styles.infoSection}>
      {renderField(name, "Add your name", "person")}
      {renderField(email, "Add your email", "mail")}
      {renderField(phone, "Add your phone number", "call")}
      {renderField(address, "Add your address", "location")}
    </View>
  );
};

export default ProfileInfo;
