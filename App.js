import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider as PaperProvider} from 'react-native-paper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from './Home';
import MapsScreen from './Maps';
import SettingsScreen from './Settings';
import OverviewScreen from "./Overview";
import DetailScreen from './Details';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // Pas de kleuren aan naar jouw voorkeur
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        // Pas de kleuren aan naar jouw voorkeur
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(28, 28, 30)',
        card: 'rgb(44, 44, 46)',
        text: 'rgb(242, 242, 242)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};


export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [jsonData, setJsonData] = useState([]);

    // Functie om de header titel te krijgen op basis van de route
    function getHeaderTitle(route) {
        const routeName = getFocusedRouteNameFromRoute(route);

        if (routeName === 'Details') {
            return 'Details'; // Als de huidige route 'Details' is, retourneer 'Details' als de titel
        } else {
            return 'Maps'; // Anders retourneer 'Maps' als de titel
        }
    }

    // Function to get information about motorcycle stores
    const fetchData = async () => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1032518/Prog7/motorcycleStores.json');
            const jsonData = await response.json();
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // When the app starts, fetch the information about motorcycle stores
        fetchData();
    },);

    return (
        <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
                {/* Bottom Tab Navigation */}
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        // Show icons for each screen in the bottom tab
                        tabBarIcon: ({color, size}) => {
                            let iconName;

                            // Determine the icon name based on the screen's name
                            if (route.name === 'Home') {
                                iconName = 'home';
                            } else if (route.name === 'Maps') {
                                iconName = 'map';
                            } else if (route.name === 'Overview') {
                                iconName = 'list';
                            } else if (route.name === 'Settings') {
                                iconName = 'cog';
                            }

                            // Show the icon with the determined name
                            return <Icon name={iconName} color={color} size={size}/>;
                        },
                    })}
                >
                    {/* Home Screen */}
                    <Tab.Screen name="Home">
                        {/* Show the Home screen and give it information about motorcycle stores */}
                        {(props) => (
                            <HomeScreen {...props} jsonData={jsonData.motorcycleStores} fetchData={fetchData}
                                        isDarkMode={isDarkMode}/>
                        )}
                    </Tab.Screen>

                    {/* Maps Screen */}
                    <Tab.Screen
                        name="Maps"
                        options={({ route }) => ({
                            title: getHeaderTitle(route), // Dynamically set the title based on the current route
                            tabBarStyle: {
                                display: route.name === 'Details' ? 'none' : 'flex',
                            },
                            headerShown: false,
                        })}
                    >
                        {(props) => (
                            <Stack.Navigator initialRouteName="Maps">
                                <Stack.Screen
                                    name="Maps"
                                    options={{
                                        headerShown: true,
                                    }}
                                >
                                    {(props) => (
                                        <MapsScreen {...props} jsonData={jsonData.motorcycleStores} screenProps={{ isDarkMode }} />
                                    )}
                                </Stack.Screen>
                                <Stack.Screen
                                    name="Details"
                                    component={DetailScreen}
                                    initialParams={{ isDarkMode }}
                                />
                            </Stack.Navigator>
                        )}
                    </Tab.Screen>

                    {/* Overview Screen */}
                    <Tab.Screen name="Overview">
                        {/* Show the Overview screen and give it information about motorcycle stores */}
                        {(props) => (
                            <OverviewScreen {...props} jsonData={jsonData.motorcycleStores} fetchData={fetchData} isDarkMode={isDarkMode}/>
                        )}
                    </Tab.Screen>

                    {/* Settings Screen */}
                    <Tab.Screen name="Settings">
                        {props => (
                            <SettingsScreen
                                {...props}
                                isDarkMode={isDarkMode}
                                setIsDarkMode={setIsDarkMode}
                            />
                        )}
                    </Tab.Screen>

                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}