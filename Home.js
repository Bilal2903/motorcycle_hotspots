import { FlatList, SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

export default function HomeScreen({ jsonData, isDarkMode }) {
    // useEffect(() => {
    //     // Log the received JSON data to the console
    //     console.log(jsonData);
    // });

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* StatusBar component */}
            <StatusBar style="auto" />
            <FlatList
                // Data to be rendered in the FlatList
                data={jsonData}
                // Rendering logic for each item
                renderItem={({ item }) => (
                    // View container for each item
                    <View style={styles.card}>
                        {/* Text component for displaying name */}
                        <Text style={styles.title}>Name: {item.name}</Text>
                        {/* Text component for displaying address */}
                        <Text style={styles.text}>Address: {item.address}</Text>
                        {/* Text component for displaying phone number */}
                        <Text style={styles.text}>Phone Number: {item.phoneNumber}</Text>
                        {/* Text component for displaying website */}
                        <Text style={styles.text}>Website: {item.website}</Text>
                    </View>
                )}
                // Function to generate unique keys for each item
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}

// Stylesheet for applying styles to components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff", // Default background color (light mode)
        paddingHorizontal: 16, // Horizontal padding of 16 units
    },
    darkContainer: {
        backgroundColor: "#000", // Background color for dark mode
    },
    card: {
        backgroundColor: "#E9F8EC", // Light green background color
        borderRadius: 10, // Rounded corners with a radius of 10 units
        borderWidth: 1, // Border width of 1 unit
        borderColor: "#000000", // Black border color
        padding: 16, // Padding of 16 units around the content
        marginBottom: 16, // Margin bottom of 16 units for spacing between cards
        width: Dimensions.get("window").width - 32, // Width equal to the window width minus twice the horizontal padding
    },
    title: {
        fontSize: 18, // Font size of 18 units
        fontWeight: "bold", // Bold font weight
        marginBottom: 8, // Margin bottom of 8 units for spacing between title and other text
    },
    text: {
        fontSize: 16, // Font size of 16 units
        marginBottom: 4, // Margin bottom of 4 units for spacing between text items
    },
});
