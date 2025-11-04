import React, { useState, useCallback, useRef } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { estilos } from "../styles/StatsScreenStyles";
import taskDatabase from '../services/SqliteServices';
import TaskStatsService from '../services/TaskStatsService';
import { auth } from '../services/firebaseConfig';

/**
 * Pantalla que muestra las estadísticas de las tareas del usuario.
 * Incluye tarjetas con el total de tareas completadas y pendientes,
 * el progreso general y un gráfico de barras de la productividad semanal.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {React.ReactElement} El componente de la pantalla de estadísticas.
 */
const StatsScreen = ({ navigation }) => {
  const [cargando, setCargando] = useState(true);
  const [stats, setStats] = useState(null); 

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const barAnimations = useRef([...Array(7)].map(() => new Animated.Value(0))).current;

  /**
   * Carga las tareas del usuario, calcula las estadísticas a través de `TaskStatsService`
   * y actualiza el estado del componente. También gestiona el estado de carga.
   */
  const cargarEstadisticas = () => {
    setCargando(true);
    const user = auth.currentUser;
    if (user) {
      const allTasks = taskDatabase.getTasksByUserId(user.uid);
      const calculatedStats = TaskStatsService.generateStats(allTasks);
      setStats(calculatedStats);
    }
    
    setTimeout(() => {
      setCargando(false);
      iniciarAnimaciones();
    }, 500);
  };

  // Hook que recarga las estadísticas cada vez que la pantalla vuelve a estar en foco.
  useFocusEffect(
    useCallback(() => {
      cargarEstadisticas();
    }, [])
  );

  /**
   * Inicia las animaciones de la pantalla, incluyendo el desvanecimiento,
   * el deslizamiento de entrada y la animación escalonada de las barras del gráfico.
   */
  const iniciarAnimaciones = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.stagger(100, 
      barAnimations.map((anim) =>
        Animated.spring(anim, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true })
      )
    ).start();
  };

  /**
   * Componente interno para renderizar una barra animada en el gráfico de productividad.
   * @param {object} props - Propiedades del componente de barra.
   * @param {object} props.item - Datos de la barra (día y valor).
   * @param {Animated.Value} props.animValue - El valor animado que controla la altura de la barra.
   * @returns {React.ReactElement}
   */
  const BarraAnimada = ({ item, animValue }) => {
    const height = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, item.valor] });
    return (
      <View style={estilos.barraContainer}>
        <View style={estilos.barraWrapper}>
          <Animated.View style={{ height: height.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }), width: 28, borderRadius: 8, overflow: 'hidden' }}>
            <LinearGradient colors={item.valor >= 80 ? ['#4CAF50', '#66BB6A'] : ['#FF5252', '#FF6B6B']} style={{ flex: 1 }} />
          </Animated.View>
        </View>
        <Text style={estilos.labelBarra}>{item.dia}</Text>
      </View>
    );
  };

  if (cargando || !stats) {
    return (
      <SafeAreaView style={estilos.contenedorGlobal}>
        <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={[estilos.gradientBackground, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Calculando estadísticas...</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedorGlobal}>
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={estilos.gradientBackground}>
        <ScrollView style={estilos.contenedor} showsVerticalScrollIndicator={false}>
          
          <Animated.View style={[estilos.encabezado, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={estilos.botonVolver} onPress={() => navigation.goBack()}>
              <Text style={estilos.iconoVolver}>←</Text>
            </TouchableOpacity>
            <Text style={estilos.titulo}>📊 Estadísticas</Text>
            <View style={{ width: 40 }} />
          </Animated.View>

          <View style={estilos.seccionTarjetas}>
            <View style={estilos.fila}>
                <View style={estilos.tarjetaEstadistica}>
                  <LinearGradient colors={['#FF5252', '#E91E63']} style={estilos.gradientTarjeta}>
                    <Text style={estilos.iconoTarjeta}>✅</Text>
                    <Text style={estilos.valorTarjeta}>{stats.completed}</Text>
                    <Text style={estilos.labelTarjeta}>Completadas</Text>
                  </LinearGradient>
                </View>
                <View style={estilos.tarjetaEstadistica}>
                  <LinearGradient colors={['#6366F1', '#8B5CF6']} style={estilos.gradientTarjeta}>
                    <Text style={estilos.iconoTarjeta}>⏳</Text>
                    <Text style={estilos.valorTarjeta}>{stats.pending}</Text>
                    <Text style={estilos.labelTarjeta}>Pendientes</Text>
                  </LinearGradient>
                </View>
            </View>
          </View>

          <Animated.View style={[estilos.seccion, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={estilos.tituloSeccion}>Progreso General</Text>
            <View style={estilos.tarjetaProgreso}>
              <View style={estilos.infoProgreso}>
                <Text style={estilos.porcentajeGrande}>{stats.completionRate}%</Text>
                <Text style={estilos.textoProgreso}>de tareas completadas</Text>
              </View>
            </View>
          </Animated.View>

          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>Productividad Semanal</Text>
            <View style={estilos.graficoContainer}>
              {stats.productivity.map((item, index) => (
                <BarraAnimada key={index} item={item} animValue={barAnimations[index]} />
              ))}
            </View>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default StatsScreen;