import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { estilos } from '../styles/RegisterScreenStyles'; 
import taskDatabase from '../services/SqliteServices';
import { auth } from '../services/firebaseConfig';
import { v4 as uuidv4 } from 'uuid'; 

/**
 * Pantalla que permite a los usuarios crear una nueva tarea.
 * Contiene un formulario para ingresar el título, la descripción y la prioridad de la tarea.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation para moverse a otras pantallas.
 * @returns {React.ReactElement} El componente de la pantalla para añadir tareas.
 */
const AddTaskScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');

  /**
   * Maneja la lógica para guardar una nueva tarea en la base de datos.
   * Valida que el título no esté vacío y que el usuario esté autenticado.
   * Crea un objeto de tarea con un ID único y lo guarda usando `taskDatabase.upsertTask`.
   * Muestra alertas de éxito o error y navega hacia atrás si la operación es exitosa.
   */
  const manejarGuardarTarea = () => {
    if (!titulo.trim()) {
      Alert.alert('Error', 'El título de la tarea es obligatorio.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para crear una tarea.');
      return;
    }

    const nuevaTarea = {
      id: uuidv4(),
      title: titulo,
      description: descripcion,
      priority: prioridad,
      status: 'pending',
      userId: user.uid,
    };

    try {
      taskDatabase.upsertTask(nuevaTarea.id, nuevaTarea);
      Alert.alert('Éxito', 'Tarea guardada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      Alert.alert('Error', 'No se pudo guardar la tarea.');
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.contenedor} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={estilos.fondoGradiente}>
        <ScrollView contentContainerStyle={estilos.scrollContenido}>
          <View style={estilos.contenido}>
            <View style={estilos.encabezado}>
              <Text style={estilos.titulo}>Nueva Tarea</Text>
              <Text style={estilos.subtitulo}>Añade los detalles de tu nueva tarea</Text>
            </View>

            <View style={estilos.formularioBox}>
              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Título de la Tarea</Text>
                <TextInput style={estilos.input} placeholder="Ej: Preparar reunión de equipo" placeholderTextColor="rgba(255, 255, 255, 0.4)" value={titulo} onChangeText={setTitulo} />
              </View>

              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Descripción (Opcional)</Text>
                <TextInput style={[estilos.input, { height: 100, textAlignVertical: 'top' }]} placeholder="Añadir notas, enlaces, etc." placeholderTextColor="rgba(255, 255, 255, 0.4)" value={descripcion} onChangeText={setDescripcion} multiline />
              </View>

              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Prioridad</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {['baja', 'media', 'alta'].map(p => (
                    <TouchableOpacity key={p} onPress={() => setPrioridad(p)} style={{ flex: 1, marginHorizontal: 4 }}>
                      <LinearGradient
                        colors={prioridad === p ? ['#FF5252', '#E91E63'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                        style={{ padding: 12, borderRadius: 8, alignItems: 'center' }}
                      >
                        <Text style={estilos.textoBoton}>{p.charAt(0).toUpperCase() + p.slice(1)}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.8} onPress={manejarGuardarTarea}>
                <LinearGradient colors={['#4CAF50', '#66BB6A']} style={estilos.botonPrincipal} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={estilos.textoBoton}>Guardar Tarea</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AddTaskScreen;