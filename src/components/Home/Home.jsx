import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Accelerometer } from 'expo-sensors';

export function startRide() {
  // setIsRideStarted(true);
  console.log('hallo');
};

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

  const _subscribeToTilt = () => {
    Accelerometer.addListener(accelerometerData => {
      setTiltData(accelerometerData);
    });
  };

  const _unsubscribeFromTilt = () => {
    Accelerometer.removeAllListeners();
  };

  // Voorbeeld van de laatste ritgegevens
  const lastRide = {
    date: "16-05-2024",
    distance: "25 km",
    duration: "30 min",
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../../../assets/MotorcyleRoad.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Welcome Username</Text>
         {/* Tekst "Last Track" */}
         <Text style={styles.lastTrackText}>LAST TRACK</Text>
        {/* Rechthoekig figuur */}
        <View style={styles.rectangle}>
          {/* Linkerkolom voor de foto */}
          <View style={styles.leftColumn}>
            <Image
              source={require("../../../assets/RollingShoot.jpg")}
              style={styles.image}
            />
          </View>
          {/* Rechterkolom voor de gegevens */}
          <View style={styles.rightColumn}>
            <Text>Date: {lastRide.date}</Text>
            <Text>Distance: {lastRide.distance}</Text>
            <Text>Duration: {lastRide.duration}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    position: "absolute",
    top: 80,
    left: 40,
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Arial",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 40,
    left: (Dimensions.get("window").width - 130) / 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  rectangle: {
    flexDirection: "row", // Zet de richting van de weergave in rij om kolommen te maken
    width: 400,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "absolute",
    top: 500,
    alignSelf: "center",
    borderRadius: 10,
  },
  leftColumn: {
    flex: 1, // Maak de linkerkolom flexibel, zodat deze kan worden uitgerekt om ruimte in te nemen
    justifyContent: "center", // Centreer de inhoud verticaal
    paddingHorizontal: 10, // Voeg wat padding toe aan de linker- en rechterkant
  },
  rightColumn: {
    flex: 3, // Maak de rechterkolom flexibel, zodat deze meer ruimte inneemt dan de linkerkolom
    justifyContent: "center", // Centreer de inhoud verticaal
    paddingHorizontal: 10, // Voeg wat padding toe aan de linker- en rechterkant
  },
  image: {
    width: 80, // Pas de breedte van de afbeelding aan zoals nodig
    height: 80, // Pas de hoogte van de afbeelding aan zoals nodig
    borderRadius: 5, // Afgeronde hoeken voor de afbeelding
  },
  lastTrackText: {
    position: "absolute",
    top: 480, // Pas dit aan afhankelijk van de positie die je wilt
    marginLeft: 16,
    alignSelf: "left",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Arial",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },  
});
