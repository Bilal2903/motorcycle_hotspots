import React, {useEffect} from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";


export default function OverviewScreen({jsonData, isDarkMode}) {
    useEffect(() => {
        // Print jsonData to the console
        // console.log(jsonData);
    }, []);

    const renderListItem = ({item}) => (
        // View container for each list item
        <View style={[styles.listItem, isDarkMode && styles.darkListItem]}>
            {/* Text component to display the name */}
            <Text style={styles.listItemText}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* StatusBar component */}
            <StatusBar style="auto"/>
            <FlatList
                // Data to be rendered in the FlatList
                data={jsonData}
                // Function to render each list item
                renderItem={renderListItem}
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
        backgroundColor: "#fff",
    },
    darkContainer: {
        backgroundColor: "#000",
    },
    darkListItem: {
        borderBottomColor: "#000", // Color of the bottom border in dark mode
    },
    listItem: {
        flexDirection: "row", // Items inside the view are arranged in a row
        alignItems: "center", // Items are vertically aligned at the center
        backgroundColor: "#E9F8EC", // Background color of each list item
        padding: 16, // Spacing around the list item
        borderBottomWidth: 5, // Border width for the bottom border
        borderBottomColor: "#fff", // Color of the bottom border
    },
    listItemText: {
        marginLeft: 16, // Spacing on the left side of the text
        fontSize: 16, // Font size of the text
    },
});
