import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../../config/firebase";

export default function HomeScreen() {
  const user = auth.currentUser;

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
        <Text style={styles.title}>Welcome {auth.currentUser.displayName}</Text>
        <Text style={styles.lastTrackText}>LAST TRACK</Text>
        <View style={styles.rectangle}>
          <View style={styles.leftColumn}>
            <Image
              source={require("../../../assets/RollingShoot.jpg")}
              style={styles.image}
            />
          </View>
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
    top: 120,
    left: 80,
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
    flexDirection: "row",
    width: 400,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "absolute",
    top: 500,
    alignSelf: "center",
    borderRadius: 10,
  },
  leftColumn: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  rightColumn: {
    flex: 3,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  lastTrackText: {
    position: "absolute",
    top: 480,
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