import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RideSummaryScreen = ({ route }) => {
  const navigation = useNavigation();

  const { maxLeanAngleLeft, maxLeanAngleRight, brakeCount, accelerationCount } = route.params;

  console.log("Received params:", {
    maxLeanAngleLeft,
    maxLeanAngleRight,
    brakeCount,
    accelerationCount,
  });

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.summaryText}>
        Max lean angle left: {maxLeanAngleLeft}°
      </Text>
      <Text style={styles.summaryText}>
        Max lean angle right: {maxLeanAngleRight}°
      </Text>
      <Text style={styles.summaryText}>
        Number of hard brakes: {brakeCount} times
      </Text>
      <Text style={styles.summaryText}>
        Number of rapid accelerations: {accelerationCount} times
      </Text>

      {/* Use onPress to attach the navigateToHome function to the button */}
      <TouchableOpacity style={styles.stopButton} onPress={navigateToHome}>
        <Text style={styles.stopButtonText}>Navigate to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 20,
    marginBottom: 10,
  },
  stopButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  stopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RideSummaryScreen;
