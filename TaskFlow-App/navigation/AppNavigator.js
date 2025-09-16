import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../src/screens/auth/RegisterScreen";
import LoginScreen from "../src/screens/auth/LoginScreen";
import HomeScreen from "../src/screens/HomeScreen";
import SettingsScreen from "../src/screens/SettingsScreen";
import UserScreen from "../src/screens/UserScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProfileStack = createNativeStackNavigator();

const TabNavigator = () =>{
    const {user} = useAuth();
    
    return(
        <Tab.Navigator initialRouteName="Home" screenOptions={({route})=>({
            tabBarIcon: ({color, size, focused})=>{

                if (route.name === "Home") {
                    iconName = focused ? 'home':'home-outline';
                }else if(route.name === "Settings") {
                    iconName = focused ? 'home':'home-outline'; //Cambiar al icono que se va a utilizar
                }else if(route.name === "User") {
                    iconName = focused ? 'home':'home-outline'; //Cambiar al icono que se va a utilizar
                }
            }
        })}>
            <Tab.Screen name ="Home" component={HomeScreen} options={{tabBarLabel:'Home'}}></Tab.Screen>
            <Tab.Screen name ="User" component={UserScreen} options={{tabBarLabel:'Usuario'}}></Tab.Screen>
            <Tab.Screen name ="Settings" component={SettingsScreen} options={{tabBarLabel:'Ajustes'}}></Tab.Screen>
        </Tab.Navigator>
    )
}

const AuthNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

const AppNavigator = () =>{
    return(
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="User" component={UserScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default AppNavigator;