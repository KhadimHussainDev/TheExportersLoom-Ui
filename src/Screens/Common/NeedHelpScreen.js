import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import NeedHelpScreenStyles from "../../Styles/Screens/NeedHelpStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = NeedHelpScreenStyles(width, height);

const NeedHelpScreen = () => {
  // State variables for input fields
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Contact information (to avoid hardcoding multiple times)
  const contactInfo = {
    email: "Help@exporterloom.com",
    phone: "+92 309 1571051",
    address: "UET Lahore",
  };

  // Function to handle the submission of the complaint form
  const handleSubmit = () => {
    // JSON object to store form data
    const complaintData = {
      email: email.trim(),
      message: message.trim(),
    };

    // Log the JSON data in console
    // console.log("Complaint Data:", JSON.stringify(complaintData, null, 2));

    // Alert confirmation
    Alert.alert(
      "Complaint Registered",
      "Your complaint has been registered. We will get back to you shortly via provided email."
    );

    // Clear form fields after submission
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.contactText}>📧 Email: {contactInfo.email}</Text>
      <Text style={styles.contactText}>📞 Phone: {contactInfo.phone}</Text>
      <Text style={styles.contactText}>📍 Address: {contactInfo.address}</Text>

      {/* Email Input */}
      <Text style={styles.label}>Your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Complaint Input */}
      <Text style={styles.label}>Your Complaint</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Type your complaint here..."
        value={message}
        onChangeText={setMessage}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Request for Support</Text>
      </TouchableOpacity>

      {/* FAQs Section */}
      <Text style={styles.faqTitle}>FAQ's</Text>
      <View style={styles.faqContainer}>
        {[
          {
            question: "1. What is Exporter Loom?",
            answer:
              "Exporter Loom is a platform that connects exporters with local manufacturers.",
          },
          {
            question: "2. How can I register as an exporter?",
            answer:
              "You can sign up on our platform and complete your profile as an exporter.",
          },
          {
            question: "3. How do I contact customer support?",
            answer: "You can reach out via email or phone mentioned above.",
          },
        ].map((faq, index) => (
          <View key={index}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NeedHelpScreen;
