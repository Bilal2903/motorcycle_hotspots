import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./src/components/Home/Home";
import CustomTabBar from "./src/components/CustomTabBar/CustomTabBar";
import AccountScreen from "./src/components/Account/Account";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
        >
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
