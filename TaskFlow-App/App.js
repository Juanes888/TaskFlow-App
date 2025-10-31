import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";
import { useState, useEffect } from "react";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import UserScreen from "./src/screens/UserScreen";
import { Ionicons } from '@expo/vector-icons';
import EditProfileScreen from "./src/screens/EditProfileScreen";
import { auth } from "./src/services/firebaseConfig";
import { getUserProfile } from "./src/services/firestoreService";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const [userPhoto, setUserPhoto] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile && profile.photo) {
            setUserPhoto(profile.photo);
          }
        } catch (error) {
          console.error("Error al cargar foto de perfil:", error);
        }
      }
    };

    fetchUserPhoto();

    // Escuchar cambios en el perfil
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUserPhoto();
    });

    return () => unsubscribe();
  }, [user]);

  // Función para refrescar la foto cuando se actualiza el perfil
  const refreshUserPhoto = async () => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        if (profile && profile.photo) {
          setUserPhoto(profile.photo);
        } else {
          setUserPhoto(null);
        }
      } catch (error) {
        console.error("Error al refrescar foto:", error);
      }
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Inicio") {
            const iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Usuario") {
            // Mostrar foto de perfil o ícono por defecto
            if (userPhoto) {
              return (
                <View style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  overflow: 'hidden',
                  borderWidth: focused ? 2 : 0,
                  borderColor: color,
                }}>
                  <Image
                    source={{ uri: userPhoto }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              );
            } else {
              const iconName = focused ? "person" : "person-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          } else if (route.name === "Configuracion") {
            const iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: 'gray',
      })}
      screenListeners={{
        focus: () => {
          // Refrescar foto cuando se enfoca cualquier pestaña
          refreshUserPhoto();
        },
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen}
        listeners={{
          focus: refreshUserPhoto,
        }}
      />
      <Tab.Screen 
        name="Usuario" 
        component={UserScreen}
        listeners={{
          focus: refreshUserPhoto,
        }}
      />
      <Tab.Screen 
        name="Configuracion" 
        component={SettingsScreen}
        listeners={{
          focus: refreshUserPhoto,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Inicio" component={MainTabs} />
        <Stack.Screen name="Usuario" component={UserScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
