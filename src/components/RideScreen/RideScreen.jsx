import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";

const RideScreen = () => {
  const navigation = useNavigation();
  const [tiltData, setTiltData] = useState({ x: 0, y: 0, z: 0 });
  const [maxLeanAngleLeft, setMaxLeanAngleLeft] = useState(0);
  const [maxLeanAngleRight, setMaxLeanAngleRight] = useState(0);
  const [brakeCount, setBrakeCount] = useState(0);
  const [accelerationCount, setAccelerationCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const subscribeToTilt = () => {
        Accelerometer.addListener((accelerometerData) => {
          setTiltData(accelerometerData);
          checkBrakeAndAcceleration(accelerometerData.y);
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
    console.log("Current Nose Angle:", noseAngle);
    // console.log("time hard braked:", brakeCount);
    // console.log("times hard accelerated:", accelerationCount);

    // Update max lean angles with logging
    if (angle > 0 && angle !== 180) {
      // Ensure angle is not 180
      if (angle > maxLeanAngleRight) {
        console.log("Updating maxLeanAngleRight:", angle);
        setMaxLeanAngleRight(angle);
      }
    } else if (angle < 0) {
      if (angle < maxLeanAngleLeft) {
        console.log("Updating maxLeanAngleLeft:", angle);
        setMaxLeanAngleLeft(angle);
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

  //Er voor zorgen dat hij optelt bij hard breaking en acceleration ding
  const checkBrakeAndAcceleration = (y) => {
    const brakeThreshold = -5; // Drempelwaarde voor hard remmen
    const accelerationThreshold = 5; // Drempelwaarde voor hard gas geven
    
    if (noseAngle < brakeThreshold) {
      console.log("Een keer hard geremd");
      if (tiltData.y < brakeThreshold) { // Check of de neus onder de drempelwaarde is
        setBrakeCount((prevCount) => {
          console.log("Brake count updated:", prevCount + 1);
          return prevCount + 1;
        });
      }
    } else if (noseAngle > accelerationThreshold) {
      console.log("Kanker hard gas gegeven ouwe");
      if (tiltData.y > accelerationThreshold) { // Check of de neus boven de drempelwaarde is
        setAccelerationCount((prevCount) => {
          console.log("Acceleration count updated:", prevCount + 1);
          return prevCount + 1;
        });
      }
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
