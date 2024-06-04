import React, { useState, useEffect } from "react";
import { Accelerometer } from 'expo-sensors';

export default function HomeScreen() {
  const [isRideStarted, setIsRideStarted] = useState(false);
  const [tiltData, setTiltData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    _subscribeToTilt();
    return () => {
      _unsubscribeFromTilt();
    };
  }, []);

  useEffect(() => {
    console.log("Tilt data:", tiltData);
  }, [tiltData]);

  const startRide = () => {
    setIsRideStarted(true);
    console.log('hallo');
  };

  const _subscribeToTilt = () => {
    Accelerometer.addListener(accelerometerData => {
      setTiltData(accelerometerData);
    });
  };

  const _unsubscribeFromTilt = () => {
    Accelerometer.removeAllListeners();
  };
}
