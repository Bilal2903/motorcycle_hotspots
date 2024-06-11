import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";

const RideScreen = () => {
  const navigation = useNavigation();
  const [tiltData, setTiltData] = useState({ x: 0, y: 0, z: 0 });
  const [maxLeanAngleLeft, setMaxLeanAngleLeft] = useState(0);
  const [maxLeanAngleRight, setMaxLeanAngleRight] = useState(0);

  const [brakeThresholdCrossed, setBrakeThresholdCrossed] = useState(false);
  const [accelerationThresholdCrossed, setAccelerationThresholdCrossed] =
    useState(false);
  const [brakeCount, setBrakeCount] = useState(0);
  const [accelerationCount, setAccelerationCount] = useState(0);
  const [initializing, setInitializing] = useState(true);

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
    const noseAngle = calculateLeanAngle(tiltData.y, tiltData.z);

    if (initializing) {
      setTimeout(() => setInitializing(false), 1000);
    } else {
      checkBrakeAndAcceleration(noseAngle);

      if (angle > 0 && angle !== 180) {
        if (angle > maxLeanAngleRight) {
          setMaxLeanAngleRight(angle);
        }
      } else if (angle < 0) {
        if (angle < maxLeanAngleLeft) {
          setMaxLeanAngleLeft(angle);
        }
      }
    }
  }, [tiltData]);

  const stopRide = () => {
    Accelerometer.removeAllListeners();
    console.log("Navigating with values:", {
      maxLeanAngleLeft,
      maxLeanAngleRight,
      brakeCount,
      accelerationCount,
    });
    navigation.navigate("RideSummary", {
      maxLeanAngleLeft: maxLeanAngleLeft === -Infinity ? 0 : maxLeanAngleLeft,
      maxLeanAngleRight:
        maxLeanAngleRight === -Infinity ? 0 : maxLeanAngleRight,
      brakeCount,
      accelerationCount,
    });
    console.log("Ride Stopped...");
  };

  const checkBrakeAndAcceleration = (noseAngle) => {
    const brakeThreshold = 15;
    const accelerationThreshold = -15;

    if (noseAngle > brakeThreshold) {
      if (!brakeThresholdCrossed) {
        console.log("You have braked hard");
        setBrakeCount((prevCount) => prevCount + 1);
        setBrakeThresholdCrossed(true);
      }
    } else {
      setBrakeThresholdCrossed(false);
    }

    if (noseAngle < accelerationThreshold) {
      if (!accelerationThresholdCrossed) {
        console.log("You have accelerated hard");
        setAccelerationCount((prevCount) => prevCount + 1);
        setAccelerationThresholdCrossed(true);
      }
    } else {
      setAccelerationThresholdCrossed(false);
    }
  };

  return (
    <View style={styles.rideScreen}>
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>Ride Started...</Text>
        <Text style={styles.screenDiscription}>
          We're currently analyzing your ride to provide you with valuable
          feedback once it's complete. Enjoy the journey!
        </Text>
        <TouchableOpacity style={styles.stopButton} onPress={stopRide}>
          <Text style={styles.stopButtonText}>Stop the ride</Text>
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
    width: "80%",
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
  screenDiscription: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  stopButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  stopButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RideScreen;