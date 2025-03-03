import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import OverviewScreenStyles from "../../Styles/Screens/Exporter/OverviewScreenStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = OverviewScreenStyles(width, height);

const OverviewScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>The Exporter’s Loom</Text>
      <Text style={styles.subHeading}>App Overview & Features</Text>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Sign Up & Describe Needs
        </Text>
        <Text style={styles.description}>
          Exporters can register, specify manufacturing needs, and list product
          requirements. This ensures clarity and transparency in the sourcing
          process.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Receive Bids from Machine Owners
        </Text>
        <Text style={styles.description}>
          Machine owners place bids based on cost and quality, helping exporters
          find the best match. Exporters can compare different offers before
          making a decision.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Connect with Local Cutters
        </Text>
        <Text style={styles.description}>
          Easily connect with local experts for cutting, printing, and sewing,
          streamlining the manufacturing process.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Get Price Estimates
        </Text>
        <Text style={styles.description}>
          Receive accurate price estimates for manufacturing and compare various
          options to optimize costs.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Free & Premium Options
        </Text>
        <Text style={styles.description}>
          Choose between free and premium services. Premium options offer added
          benefits like insurance and financing for more security.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Featured Promotions
        </Text>
        <Text style={styles.description}>
          Machine owners can promote their services for better visibility,
          increasing their chances of getting hired.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Image Processing for Mockups
        </Text>
        <Text style={styles.description}>
          The system extracts text from mockup images, making order processing
          easier and more efficient.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <Text style={styles.bullet}>🔹</Text> Manufacturing Process Modeling
        </Text>
        <Text style={styles.description}>
          Exporters can visualize and plan the entire manufacturing workflow
          within the app, improving efficiency and execution.
        </Text>
      </View>

      <Text style={styles.footer}>
        Experience Seamless Exporting with The Exporter’s Loom!
      </Text>
    </ScrollView>
  );
};

export default OverviewScreen;
