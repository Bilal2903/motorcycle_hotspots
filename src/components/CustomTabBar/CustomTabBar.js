import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Overview") {
          iconName = "list";
        } else if (route.name === "Settings") {
          iconName = "cog";
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
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
        onPress={() => console.log("Go button pressed")}
      >
        <Text style={styles.goButtonText}>GO!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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

export default CustomTabBar;