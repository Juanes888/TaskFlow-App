import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "./src/services/firebaseConfig";
import { getUserProfile } from "./src/services/firestoreService";
import taskDatabase from "./src/services/SqliteServices";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import UserScreen from "./src/screens/UserScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import ConcentrationScreen from "./src/screens/ConcentrationScreen";
import StatsScreen from "./src/screens/StatsScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen"; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const [userPhoto, setUserPhoto] = useState(null);

  const fetchUserPhoto = useCallback(async () => {
    if (auth.currentUser) {
      try {
        const profile = await getUserProfile(auth.currentUser.uid);
        if (profile && profile.photo) {
          setUserPhoto(profile.photo);
        } else {
          setUserPhoto(null);
        }
      } catch (error) {
        console.error("Error al cargar foto de perfil:", error);
        setUserPhoto(null);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserPhoto();
    }, [fetchUserPhoto])
  );

  useEffect(() => {
    fetchUserPhoto();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserPhoto();
      } else {
        setUserPhoto(null);
      }
    });

    return () => unsubscribe();
  }, [fetchUserPhoto]);

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Inicio") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Usuario") {
            if (userPhoto) {
              return (
                <View
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    overflow: "hidden",
                    borderWidth: focused ? 2 : 0,
                    borderColor: color,
                  }}
                >
                  <Image
                    key={userPhoto}
                    source={{ uri: userPhoto }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              );
            } else {
              return (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size}
                  color={color}
                />
              );
            }
          } else if (route.name === "Configuracion") {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="Usuario"
        component={UserScreen}
        options={{ title: "Usuario" }}
      />
      <Tab.Screen
        name="Configuracion"
        component={SettingsScreen}
        options={{ title: "Configuración" }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={StatsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    taskDatabase.init();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: true,
                title: "Editar Perfil",
              }}
            />
            <Stack.Screen
              name="Concentracion"
              component={ConcentrationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="AddTask" 
              component={AddTaskScreen} 
              options={{ headerShown: false }} 
            /> 
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
