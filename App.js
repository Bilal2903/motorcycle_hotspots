import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Accelerometer } from "expo-sensors";
import useAuth from "./hooks/useAuth";

import HomeScreen from "./src/components/Home/Home";
import AccountScreen from "./src/components/Account/Account";
import RideScreen from "./src/components/RideScreen/RideScreen";
import Register from "./src/components/Register/Register";
import Login from "./src/components/Login/Login";
import RideSummaryScreen from "./src/components/RideSummaryScreen/RideSummaryScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [isRideStarted, setIsRideStarted] = useState(false);
  const [tiltData, setTiltData] = useState({ x: 0, y: 0, z: 0 });
  const [leanAngle, setLeanAngle] = useState(0);

  useEffect(() => {
    _subscribeToTilt();
    return () => {
      _unsubscribeFromTilt();
    };
  }, []);

// Maybe mag dit weg want het werkt terwijl dit uitgecommand is
  // useEffect(() => {
  //   if (isRideStarted) {
  //     const angle = calculateLeanAngle(tiltData.x, tiltData.z);
  //     console.log("Lean Angle:", leanAngle, "degrees");
  //     setLeanAngle(angle);
  //   }
  // }, [tiltData]);

  const startRide = () => {
    setIsRideStarted(true);
    navigation.navigate("RideScreen");
    console.log("Ride Started...");
  };

  const _subscribeToTilt = () => {
    Accelerometer.addListener((accelerometerData) => {
      setTiltData(accelerometerData);
    });
  };
// Maybe mag dit weg want het werkt terwijl dit uitgecommand is
  // const calculateLeanAngle = (x, z) => {
  //   const radians = Math.atan2(x, z);
  //   let degrees = radians * (180 / Math.PI);
  //   degrees = 180 - degrees;
  //   if (degrees > 180) {
  //     degrees -= 360;
  //   }
  //   degrees = Math.round(degrees);
  //   return degrees;
  // };

  const _unsubscribeFromTilt = () => {
    Accelerometer.removeAllListeners();
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Account") {
          iconName = "user";
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon
              name={iconName}
              size={30}
              color={isFocused ? "red" : "black"}
            />
            <Text style={{ color: isFocused ? "red" : "black" }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.goButton} onPress={startRide}>
        <Text style={styles.goButtonText}>GO!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 80,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 45,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
  goButton: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -30,
    left: "50%",
    marginLeft: -30,
  },
  goButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const MainTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const { user } = useAuth();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <>
              <Stack.Screen
                name="MainTabs"
                component={MainTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RideScreen"
                component={RideScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="RideSummary"
                component={RideSummaryScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
