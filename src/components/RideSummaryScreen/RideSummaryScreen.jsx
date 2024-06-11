import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons"; // Importeer FontAwesome5 vanuit @expo/vector-icons

const RideSummaryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { maxLeanAngleLeft, maxLeanAngleRight, brakeCount, accelerationCount } =
    route.params;

  const getBrakeMessage = (count) => {
    if (count === 1) {
      return "You've braked hard once. Be careful and try to look further ahead.";
    } else if (count === 2) {
      return "You've braked hard twice. Try to anticipate more to prevent sudden braking.";
    } else if (count === 3) {
      return "You've braked hard three times. Try to create more space between you and the car in front.";
    } else if (count === 4) {
      return "You've braked hard four times. Try to reduce your speed before turns.";
    } else if (count >= 5) {
      return "They shouldn't have given you a driver's license!";
    } else {
      return "Your braking style is good, keep it up!";
    }
  };

  const getAccelerationMessage = (count) => {
    if (count === 1) {
      return "You've accelerated hard once. Try to accelerate more smoothly.";
    } else if (count === 2) {
      return "You've accelerated hard twice. Try to accelerate more evenly.";
    } else if (count === 3) {
      return "You've accelerated hard three times. Try to create a smoother ride by accelerating more gradually.";
    } else if (count === 4) {
      return "You've accelerated hard four times. Try to maintain control and accelerate more gradually.";
    } else if (count >= 5) {
      return "They shouldn't have given you a driver's license!";
    } else {
      return "Your acceleration style is good, keep it up!";
    }
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ride Summary</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Max Lean Angle Left: {maxLeanAngleLeft}°
        </Text>
        <Text style={styles.summaryText}>
          Max Lean Angle Right: {maxLeanAngleRight}°
        </Text>
      </View>
      <View style={styles.messageItem}>
        <FontAwesome5 name="exclamation-circle" size={18} color="blue" />
        <Text style={styles.messageText}>{getBrakeMessage(brakeCount)}</Text>
      </View>
      <View style={styles.messageItem}>
        <FontAwesome5 name="exclamation-circle" size={18} color="blue" />
        <Text style={styles.messageText}>
          {getAccelerationMessage(accelerationCount)}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Text style={styles.buttonText}>Navigate to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  summaryContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#555",
  },
  messageContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#777",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RideSummaryScreen;
