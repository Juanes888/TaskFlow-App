import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from '../services/firebaseConfig';
import { getUserProfile } from '../services/firestoreService';
import { Image, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';

/**
 * Componente principal que renderiza la barra de navegación inferior (Tab Navigator).
 *
 * Este componente define las pestañas principales de la aplicación (Inicio, Usuario, Configuración, Estadísticas)
 * y gestiona la lógica para mostrar los íconos correspondientes.
 *
 * Se encarga de obtener la foto de perfil del usuario actual y mostrarla como el ícono
 * de la pestaña "Usuario". La foto se actualiza cada vez que la pantalla obtiene el foco.
 *
 * @returns {React.ReactElement} El navegador de pestañas configurado.
 */


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const loadUserPhoto = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile && profile.photo) {
            setUserPhoto(profile.photo);
          }
        } catch (error) {
          console.error("Error loading user photo:", error);
        }
      }
    };
    
    loadUserPhoto();

    const unsubscribe = auth.onAuthStateChanged(() => {
      loadUserPhoto();
    });
    
    return () => unsubscribe();
  }, [user]);

  return (
    <Tab.Navigator>
      
      <Tab.Screen 
        name="Profile" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            userPhoto ? (
              <View style={[styles.avatarContainer, focused && styles.avatarFocused]}>
                <Image 
                  source={{ uri: userPhoto }} 
                  style={styles.avatar}
                />
              </View>
            ) : (
              <MaterialIcons name="person" size={size} color={color} />
            )
          ),
          tabBarLabel: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  avatarFocused: {
    borderColor: '#1976d2',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

export default TabNavigator;