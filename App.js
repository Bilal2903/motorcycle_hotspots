import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./src/components/Home/Home";
import AccountScreen from "./src/components/Account/Account";
import { RideStarted } from "./src/components/Home/Home";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
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
      <TouchableOpacity
        style={styles.goButton}
        onPress={RideStarted}
      >
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
    position: 'absolute',
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

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </PaperProvider>
  );
}
