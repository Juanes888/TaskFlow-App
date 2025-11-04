import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { estilos } from "../styles/HomeScreenStyles";
import taskDatabase from '../services/SqliteServices';
import { auth } from '../services/firebaseConfig';
import TaskStatsService from '../services/TaskStatsService';

/**
 * Pantalla principal de la aplicación (Dashboard).
 * Muestra un saludo, el progreso de las tareas del día, acciones rápidas y la lista de tareas del usuario.
 * Permite al usuario completar, desmarcar y eliminar tareas.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {React.ReactElement} El componente de la pantalla de inicio.
 */
const HomeScreen = ({ navigation }) => {
  const [tareas, setTareas] = useState([]);

  /**
   * Carga las tareas del usuario actual desde la base de datos local (SQLite)
   * y actualiza el estado del componente.
   */
  const cargarTareas = () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const tareasDesdeDB = taskDatabase.getTasksByUserId(user.uid);
        setTareas(tareasDesdeDB);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
        setTareas([]);
      }
    }
  };

  // Hook que recarga las tareas cada vez que la pantalla vuelve a estar en foco.
  useFocusEffect(
    useCallback(() => {
      cargarTareas();
    }, [])
  );

  /**
   * Cambia el estado de una tarea entre 'completed' y 'pending'.
   * @param {string} id - El ID de la tarea a modificar.
   */
  const alternarTarea = (id) => {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      const nuevoEstado = tarea.status === 'completed' ? 'pending' : 'completed';
      taskDatabase.updateTask(id, { status: nuevoEstado });
      cargarTareas();
    }
  };

  const tareasCompletadas = tareas.filter((t) => t.status === 'completed').length;
  const totalTareas = tareas.length;
  const progreso = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

  /**
   * Devuelve un color hexadecimal basado en el nivel de prioridad de una tarea.
   * @param {string} prioridad - La prioridad de la tarea ('alta', 'media', 'baja').
   * @returns {string} El color correspondiente a la prioridad.
   */
  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return '#FF5252';
      case 'media': return '#FFC300';
      case 'baja': return '#4CAF50';
      default: return '#999';
    }
  };


  const logrosDesbloqueados = TaskStatsService.checkAchievements(tareas);
  if (logrosDesbloqueados.length > 0) {
    alert(`¡Logro desbloqueado: ${logrosDesbloqueados[0].name}!`);
  }

  /**
   * Muestra un menú de opciones cuando un usuario mantiene presionada una tarea.
   * Actualmente, la única opción es "Eliminar".
   * @param {string} id - El ID de la tarea sobre la que se mantuvo la pulsación.
   */
  const manejarPulsacionLarga = (id) => {
    Alert.alert(
      "Opciones de Tarea",
      "¿Qué te gustaría hacer con esta tarea?",
      [
        {
          text: "Eliminar",
          onPress: () => confirmarEliminacion(id), 
          style: "destructive",
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  /**
   * Muestra una alerta de confirmación final antes de eliminar una tarea.
   * Si el usuario confirma, procede a eliminar la tarea de la base de datos.
   * @param {string} id - El ID de la tarea a eliminar.
   */
  const confirmarEliminacion = (id) => {
    Alert.alert(
      "¿Estás seguro?",
      "Esta acción no se puede deshacer.",
      [
        {
          text: "Sí, eliminar",
          onPress: () => {
            try {
              taskDatabase.deleteTaskById(id);
              cargarTareas(); 
            } catch (error) {
              console.error("Error al eliminar la tarea:", error);
              Alert.alert("Error", "No se pudo eliminar la tarea.");
            }
          },
          style: "destructive",
        },
        {
          text: "No, cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={estilos.contenedorGlobal}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={estilos.gradientBackground}
      >
        <ScrollView style={estilos.contenedorInicio} showsVerticalScrollIndicator={false}>
          <View style={estilos.encabezado}>
            <View style={estilos.filaSuperior}>
              <View>
                <Text style={estilos.saludo}>¡Hola! 👋</Text>
                <Text style={estilos.usuario}>Bienvenido de vuelta</Text>
              </View>
              <TouchableOpacity
                style={estilos.botonPerfil}
                onPress={() => navigation.navigate("Usuario")}
              >
                <LinearGradient
                  colors={['#FF5252', '#E91E63']}
                  style={estilos.gradientPerfil}
                >
                  <Text style={estilos.iconoPerfil}>👤</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={estilos.tarjetaProgreso}>
              <LinearGradient
                colors={['#FF5252', '#E91E63', '#C2185B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={estilos.gradientProgreso}
              >
                <View style={estilos.contenidoProgreso}>
                  <View style={estilos.iconoProgresoContainer}>
                    <Text style={estilos.iconoProgreso}>🎯</Text>
                  </View>
                  <View style={estilos.infoProgresoContainer}>
                    <Text style={estilos.tituloProgreso}>Progreso del día</Text>
                    <Text style={estilos.textoProgreso}>
                      {tareasCompletadas} de {totalTareas} tareas completadas
                    </Text>
                  </View>
                  <View style={estilos.porcentajeContainer}>
                    <Text style={estilos.porcentajeProgreso}>
                      {Math.round(progreso)}%
                    </Text>
                  </View>
                </View>
                <View style={estilos.barraProgresoContainer}>
                  <View style={estilos.barraProgreso}>
                    <View
                      style={[estilos.rellenoProgreso, { width: `${progreso}%` }]}
                    />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>


          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>Acciones Rápidas</Text>
            <View style={estilos.accionesRapidas}>
              <TouchableOpacity style={estilos.accionCard} onPress={() => navigation.navigate('Concentracion')}>
                <LinearGradient colors={['#8B5CF6', '#6366F1']} style={estilos.gradientAccion}>
                  <Text style={estilos.accionIcono}>🧘</Text>
                  <Text style={estilos.accionTexto}>Modo Concentración</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.accionCard} onPress={() => navigation.navigate('Estadisticas')}>
                <LinearGradient colors={['#2196F3', '#42A5F5']} style={estilos.gradientAccion}>
                  <Text style={estilos.accionIcono}>📊</Text>
                  <Text style={estilos.accionTexto}>Ver Estadísticas</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.accionCard} onPress={() => navigation.navigate('AddTask')}>
                <LinearGradient colors={['#4CAF50', '#66BB6A']} style={estilos.gradientAccion}>
                  <Text style={estilos.accionIcono}>✍️</Text>
                  <Text style={estilos.accionTexto}>Nueva Tarea</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>


          <View style={estilos.seccion}>
            <View style={estilos.encabezadoSeccion}>
              <Text style={estilos.tituloSeccion}>Mis Tareas 📋</Text>
              <TouchableOpacity style={estilos.botonAgregar} onPress={() => navigation.navigate('AddTask')}>
                <LinearGradient
                  colors={['#FF5252', '#FF6B6B']}
                  style={estilos.gradientBoton}
                >
                  <Text style={estilos.textoBotonAgregar}>+ Agregar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {tareas.map((tarea) => {
              const isCompleted = tarea.status === 'completed';
              return (
                <TouchableOpacity
                  key={tarea.id}
                  onPress={() => alternarTarea(tarea.id)}
                  onLongPress={() => manejarPulsacionLarga(tarea.id)} 
                  style={estilos.tarjetaTarea}
                  activeOpacity={0.8}
                  delayLongPress={200} 
                >
                  <View style={estilos.contenidoTarea}>
                    <View style={[
                      estilos.checkbox,
                      isCompleted && estilos.checkboxCompletado
                    ]}>
                      {isCompleted && <Text style={estilos.checkIcon}>✓</Text>}
                    </View>
                    <View style={estilos.infoTarea}>
                      <Text style={[
                        estilos.tituloTarea,
                        isCompleted && estilos.tareaCompletada
                      ]}>
                        {tarea.title}
                      </Text>
                      <View style={estilos.metadataTarea}>
                        <View style={[
                          estilos.badgePrioridad,
                          { backgroundColor: getPrioridadColor(tarea.priority) + '20' }
                        ]}>
                          <Text style={[
                            estilos.textoPrioridad,
                            { color: getPrioridadColor(tarea.priority) }
                          ]}>
                            {tarea.priority.charAt(0).toUpperCase() + tarea.priority.slice(1)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
