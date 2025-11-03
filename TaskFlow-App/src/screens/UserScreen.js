import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from "expo-image-picker";
import { auth } from "../services/firebaseConfig";
import { saveUserProfile, getUserProfile } from "../services/firestoreService";
import estilos from "../styles/UserScreenStyles"; 

const estadisticas = [
  { etiqueta: "Tareas completadas", valor: "127", icono: "✅", color: ['#4CAF50', '#66BB6A'] },
  { etiqueta: "Días activos", valor: "23", icono: "📅", color: ['#2196F3', '#42A5F5'] },
  { etiqueta: "Tiempo enfocado", valor: "45h", icono: "⏱️", color: ['#FF9800', '#FFB74D'] },
  { etiqueta: "Racha actual", valor: "7", icono: "🔥", color: ['#FF5252', '#E91E63'] },
];

const logros = [
  { titulo: "Primera tarea", descripcion: "Completaste tu primera tarea", icono: "🎯", desbloqueado: true },
  { titulo: "Productivo", descripcion: "Completa 10 tareas en un día", icono: "⚡", desbloqueado: true },
  { titulo: "Constante", descripcion: "Mantén una racha de 7 días", icono: "🔥", desbloqueado: true },
  { titulo: "Maestro del tiempo", descripcion: "Usa el cronómetro 50 veces", icono: "⏰", desbloqueado: false },
  { titulo: "Súper enfocado", descripcion: "Completa 5 sesiones de concentración", icono: "🧘", desbloqueado: false },
  { titulo: "Leyenda", descripcion: "Mantén una racha de 30 días", icono: "👑", desbloqueado: false },
];

const UserScreen = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    loadProfilePhoto();
  }, []);

  const loadProfilePhoto = async () => {
    if (!user) return;
    try {
      const profile = await getUserProfile(user.uid);
      if (profile && profile.photo) {
        setProfilePhoto(profile.photo);
      }
    } catch (error) {
      console.error("Error al cargar foto:", error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && user) {
        const imageUri = result.assets[0].uri;
        setProfilePhoto(imageUri);
        setLoading(true);
        try {
          await saveUserProfile(user.uid, { photo: imageUri });
        } catch (error) {
          console.error("Error al guardar foto:", error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedorGlobal}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={estilos.gradientBackground}
      >
        <ScrollView style={estilos.contenedor} showsVerticalScrollIndicator={false}>
          {/* Header con perfil */}
          <View style={estilos.encabezado}>
            <TouchableOpacity 
              style={estilos.botonVolver}
              onPress={() => navigation.goBack()}
            >
              <Text style={estilos.textoBotonVolver}>←</Text>
            </TouchableOpacity>

            <View style={estilos.seccionPerfil}>
              <TouchableOpacity onPress={pickImage} disabled={loading}>
                <LinearGradient
                  colors={['#FF5252', '#E91E63', '#C2185B']}
                  style={estilos.gradientAvatar}
                >
                  <View style={estilos.avatarContainer}>
                    {profilePhoto ? (
                      <Image source={{ uri: profilePhoto }} style={estilos.avatarImage} />
                    ) : (
                      <Text style={estilos.avatarIcon}>👤</Text>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={estilos.nombreUsuario}>
                {user?.displayName || "Usuario"}
              </Text>
              <Text style={estilos.correoUsuario}>
                {user?.email || "correo@ejemplo.com"}
              </Text>
              
              <TouchableOpacity style={estilos.botonEditar} onPress={pickImage}>
                <LinearGradient
                  colors={['rgba(255, 82, 82, 0.3)', 'rgba(233, 30, 99, 0.3)']}
                  style={estilos.gradientBotonEditar}
                >
                  <Text style={estilos.textoBotonEditar}>✏️ Editar perfil</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>📊 Estadísticas</Text>
            <View style={estilos.cuadriculaEstadisticas}>
              {estadisticas.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={estilos.tarjetaEstadistica}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={item.color}
                    style={estilos.gradientEstadistica}
                  >
                    <Text style={estilos.iconoEstadistica}>{item.icono}</Text>
                    <Text style={estilos.valorEstadistica}>{item.valor}</Text>
                    <Text style={estilos.etiquetaEstadistica}>{item.etiqueta}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>


          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>🎯 Progreso General</Text>
            <View style={estilos.tarjetaProgreso}>
              <View style={estilos.encabezadoProgreso}>
                <Text style={estilos.tituloProgreso}>Nivel 12 - Experto</Text>
                <Text style={estilos.porcentajeProgreso}>73%</Text>
              </View>
              <View style={estilos.barraProgreso}>
                <LinearGradient
                  colors={['#FF5252', '#E91E63']}
                  style={[estilos.rellenoProgreso, { width: '73%' }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={estilos.textoProgreso}>
                273 XP para siguiente nivel
              </Text>
            </View>
          </View>


          <View style={estilos.seccion}>
            <View style={estilos.encabezadoLogros}>
              <Text style={estilos.tituloSeccion}>🏆 Logros</Text>
              <View style={estilos.contadorLogros}>
                <Text style={estilos.textoContadorLogros}>
                  {logros.filter(l => l.desbloqueado).length}/{logros.length}
                </Text>
              </View>
            </View>
            
            {logros.map((logro, idx) => (
              <TouchableOpacity
                key={idx}
                style={estilos.tarjetaLogro}
                activeOpacity={0.8}
              >
                <View style={estilos.contenidoLogro}>
                  <View style={[
                    estilos.iconoLogroContainer,
                    !logro.desbloqueado && estilos.iconoBloqueado
                  ]}>
                    <Text style={estilos.iconoLogro}>{logro.icono}</Text>
                  </View>
                  <View style={estilos.infoLogro}>
                    <Text style={[
                      estilos.tituloLogro,
                      !logro.desbloqueado && estilos.textoBloqueado
                    ]}>
                      {logro.titulo}
                    </Text>
                    <Text style={[
                      estilos.descripcionLogro,
                      !logro.desbloqueado && estilos.textoBloqueado
                    ]}>
                      {logro.descripcion}
                    </Text>
                  </View>
                </View>
                {logro.desbloqueado && (
                  <View style={estilos.insigniaDesbloqueado}>
                    <Text style={estilos.textoDesbloqueado}>✓</Text>
                  </View>
                )}
                {!logro.desbloqueado && (
                  <View style={estilos.insigniaBloqueado}>
                    <Text style={estilos.textoBloqueado2}>🔒</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Acciones */}
          <View style={estilos.seccion}>
            <Text style={estilos.tituloSeccion}>⚙️ Acciones</Text>
            
            <TouchableOpacity 
              style={estilos.tarjetaAccion}
              onPress={() => navigation.navigate("Configuracion")}
            >
              <Text style={estilos.iconoAccion}>⚙️</Text>
              <Text style={estilos.textoAccion}>Configuración</Text>
              <Text style={estilos.flechaAccion}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={estilos.tarjetaAccion}
              onPress={() => navigation.navigate("Estadisticas")}
            >
              <Text style={estilos.iconoAccion}>📊</Text>
              <Text style={estilos.textoAccion}>Ver estadísticas detalladas</Text>
              <Text style={estilos.flechaAccion}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UserScreen;
