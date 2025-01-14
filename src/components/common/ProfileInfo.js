import React from "react";
import { View, Text } from "react-native";
import { createProfileInfoStyles } from "../../Styles/Components/ProfileInfoStyles";

const ProfileInfo = ({ name, email, phone, address, width, height }) => {
  const styles = createProfileInfoStyles(width, height);
  return (
    <View style={styles.infoSection}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.phone}>{phone}</Text>
      <Text
        style={[styles.address, { fontSize: address.length > 30 ? 12 : 14 }]}
      >
        {address}
      </Text>
    </View>
  );
};

export default ProfileInfo;
