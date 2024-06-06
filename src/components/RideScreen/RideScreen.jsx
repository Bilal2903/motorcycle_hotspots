import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";

const RideScreen = () => {
  const navigation = useNavigation();
  const [tiltData, setTiltData] = useState({ x: 0, y: 0, z: 0 });
  const [leanAngle, setLeanAngle] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const subscribeToTilt = () => {
        Accelerometer.addListener((accelerometerData) => {
          setTiltData(accelerometerData);
        });
      };

      const unsubscribeFromTilt = () => {
        Accelerometer.removeAllListeners();
      };

      subscribeToTilt();

      return () => unsubscribeFromTilt();
    }, [])
  );

  useEffect(() => {
    const calculateLeanAngle = (x, z) => {
      console.log("Lean Angle:", leanAngle, "degrees");
      const radians = Math.atan2(x, z);
      let degrees = radians * (180 / Math.PI);
      degrees = 180 - degrees;
      if (degrees > 180) {
        degrees -= 360;
      }
      degrees = Math.round(degrees);
      return degrees;
    };

    const angle = calculateLeanAngle(tiltData.x, tiltData.z);
    setLeanAngle(angle);
  }, [tiltData]);

  const stopRide = () => {
    Accelerometer.removeAllListeners();
    navigation.navigate("Home");
    console.log('Ride Stoped...')
  };

  return (
    <View style={styles.rideScreen}>
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>Rit in uitvoering...</Text>
        <Text style={styles.screenText}>Lean Angle: {leanAngle}°</Text>
        <TouchableOpacity style={styles.stopButton} onPress={stopRide}>
          <Text style={styles.stopButtonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rideScreen: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  screenContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: '80%',
    maxWidth: 300,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  screenText: {
    fontSize: 18,
    marginBottom: 20,
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

export default RideScreen;
