import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { estilos } from "../styles/HomeScreenStyles";

const HomeScreen = ({ navigation }) => {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Revisar correos", completada: false, prioridad: "alta" },
    { id: 2, titulo: "Llamar al cliente", completada: true, prioridad: "media" },
    { id: 3, titulo: "Preparar presentación", completada: false, prioridad: "alta" },
    { id: 4, titulo: "Comprar víveres", completada: false, prioridad: "baja" },
  ]);

  const [temporizadorActivo, setTemporizadorActivo] = useState(false);
  const [duracionTemporizador, setDuracionTemporizador] = useState(25 * 60); 

  const alternarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  };

  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const totalTareas = tareas.length;
  const progreso = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

  return (
    <SafeAreaView style={estilos.contenedorGlobal}>
      <ScrollView style={estilos.contenedorInicio}>
        <View style={estilos.encabezado}>
          <View style={estilos.filaSuperior}>
            <View>
              <Text style={estilos.saludo}>¡Hola!</Text>
              <Text style={estilos.usuario}>Bienvenido de vuelta</Text>
            </View>
            <TouchableOpacity
              style={estilos.botonPerfil}
              onPress={() => navigation.navigate("Usuario")}
            >
              <Text style={estilos.iconoPerfil}>👤</Text>
            </TouchableOpacity>
          </View>

          <View style={[estilos.tarjeta, estilos.tarjetaProgreso]}>
            <Text style={estilos.tituloProgreso}>Progreso del día</Text>
            <View style={estilos.infoProgreso}>
              <Text style={estilos.textoProgreso}>
                {tareasCompletadas} de {totalTareas} tareas completadas
              </Text>
              <Text style={estilos.porcentajeProgreso}>
                {Math.round(progreso)}%
              </Text>
            </View>
            <View style={estilos.barraProgreso}>
              <View
                style={[estilos.rellenoProgreso, { width: `${progreso}%` }]}
              />
            </View>
          </View>
        </View>

        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Mis Tareas</Text>
          <View style={estilos.encabezadoSeccion}>
            <TouchableOpacity style={estilos.botonAgregar}>
              <Text style={estilos.textoBotonAgregar}>+ Agregar</Text>
            </TouchableOpacity>
          </View>
          {tareas.map((tarea) => (
            <TouchableOpacity
              key={tarea.id}
              onPress={() => alternarTarea(tarea.id)}
              style={{ marginBottom: 10, padding: 10, backgroundColor: tarea.completada ? '#d1fae5' : '#fff', borderRadius: 8 }}
            >
              <Text style={{ textDecorationLine: tarea.completada ? 'line-through' : 'none' }}>{tarea.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Acciones Rápidas</Text>
          <View style={estilos.accionesRapidas}>
            <TouchableOpacity style={estilos.accionRapida}>
              <Text style={estilos.iconoAccion}>⏰</Text>
              <Text style={estilos.textoAccion}>Concentración</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.accionRapida}>
              <Text style={estilos.iconoAccion}>📊</Text>
              <Text style={estilos.textoAccion}>Estadísticas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.accionRapida}
              onPress={() => navigation.navigate("Configuracion")}
            >
              <Text style={estilos.iconoAccion}>⚙️</Text>
              <Text style={estilos.textoAccion}>Configuración</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
