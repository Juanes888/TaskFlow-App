import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from "../services/firebaseConfig";
import { getUserData, saveUserProfile } from "../services/firestoreService";
import styles from "../styles/SettingsScreenStyles";

const SettingsScreen = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(true);
  const [sonidos, setSonidos] = useState(true);
  const [recordatorios, setRecordatorios] = useState(true);
  const [vibracion, setVibracion] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData?.configuracion) {
          setNotificaciones(userData.configuracion.notificaciones ?? true);
          setModoOscuro(userData.configuracion.modoOscuro ?? true);
          setSonidos(userData.configuracion.sonidos ?? true);
          setRecordatorios(userData.configuracion.recordatorios ?? true);
          setVibracion(userData.configuracion.vibracion ?? true);
        }
      }
    } catch (error) {
      console.error("Error al cargar configuración:", error);
    }
  };

  const saveSettings = async (key, value) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await saveUserProfile(user.uid, {
          configuracion: {
            notificaciones,
            modoOscuro,
            sonidos,
            recordatorios,
            vibracion,
            [key]: value,
          }
        });
      }
    } catch (error) {
      console.error("Error al guardar configuración:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.replace("Login");
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar sesión");
            }
          },
        },
      ]
    );
  };

  const OpcionItem = ({ icono, titulo, subtitulo, onPress, color = "#FF5252" }) => (
    <TouchableOpacity style={styles.opcionItem} onPress={onPress}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
        style={styles.opcionGradient}
      >
        <View style={[styles.iconoContainer, { backgroundColor: `${color}20` }]}>
          <MaterialCommunityIcons name={icono} size={24} color={color} />
        </View>
        <View style={styles.opcionTextos}>
          <Text style={styles.opcionTitulo}>{titulo}</Text>
          {subtitulo && <Text style={styles.opcionSubtitulo}>{subtitulo}</Text>}
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="rgba(255, 255, 255, 0.4)" />
      </LinearGradient>
    </TouchableOpacity>
  );

  const SwitchItem = ({ icono, titulo, subtitulo, valor, onValueChange, color = "#FF5252" }) => (
    <View style={styles.switchItem}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
        style={styles.switchGradient}
      >
        <View style={[styles.iconoContainer, { backgroundColor: `${color}20` }]}>
          <MaterialCommunityIcons name={icono} size={24} color={color} />
        </View>
        <View style={styles.switchTextos}>
          <Text style={styles.switchTitulo}>{titulo}</Text>
          {subtitulo && <Text style={styles.switchSubtitulo}>{subtitulo}</Text>}
        </View>
        <Switch
          value={valor}
          onValueChange={onValueChange}
          trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: color }}
          thumbColor={valor ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="rgba(255, 255, 255, 0.1)"
        />
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.contenedorGlobal}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradientBackground}
      >
        <ScrollView style={styles.contenedor} showsVerticalScrollIndicator={false}>
          
          <View style={styles.encabezado}>
            <TouchableOpacity 
              style={styles.botonVolver}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.titulo}> Configuración</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>🔔 Notificaciones</Text>
            
            <SwitchItem
              icono="bell"
              titulo="Notificaciones Push"
              subtitulo="Recibe alertas de tus tareas"
              valor={notificaciones}
              onValueChange={(val) => {
                setNotificaciones(val);
                saveSettings('notificaciones', val);
              }}
              color="#FF5252"
            />

            <SwitchItem
              icono="alarm"
              titulo="Recordatorios"
              subtitulo="Alertas antes de las fechas límite"
              valor={recordatorios}
              onValueChange={(val) => {
                setRecordatorios(val);
                saveSettings('recordatorios', val);
              }}
              color="#FFC300"
            />
          </View>

          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>🎨 Apariencia</Text>
            
            <SwitchItem
              icono="theme-light-dark"
              titulo="Modo Oscuro"
              subtitulo="Tema oscuro para tus ojos"
              valor={modoOscuro}
              onValueChange={(val) => {
                setModoOscuro(val);
                saveSettings('modoOscuro', val);
              }}
              color="#6366F1"
            />
          </View>

          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>🔊 Sonido y Vibración</Text>
            
            <SwitchItem
              icono="volume-high"
              titulo="Sonidos"
              subtitulo="Efectos de sonido en la app"
              valor={sonidos}
              onValueChange={(val) => {
                setSonidos(val);
                saveSettings('sonidos', val);
              }}
              color="#4CAF50"
            />

            <SwitchItem
              icono="vibrate"
              titulo="Vibración"
              subtitulo="Feedback háptico"
              valor={vibracion}
              onValueChange={(val) => {
                setVibracion(val);
                saveSettings('vibracion', val);
              }}
              color="#9C27B0"
            />
          </View>

 
          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>💾 Datos</Text>
            
            <OpcionItem
              icono="cloud-upload"
              titulo="Hacer Copia de Seguridad"
              subtitulo="Guarda tus datos en la nube"
              onPress={() => Alert.alert("Copia de seguridad", "Función próximamente")}
              color="#2196F3"
            />

            <OpcionItem
              icono="download"
              titulo="Exportar Datos"
              subtitulo="Descarga tus tareas en formato JSON"
              onPress={() => Alert.alert("Exportar", "Función próximamente")}
              color="#00BCD4"
            />

            <OpcionItem
              icono="upload"
              titulo="Importar Datos"
              subtitulo="Restaura datos desde un archivo"
              onPress={() => Alert.alert("Importar", "Función próximamente")}
              color="#009688"
            />
          </View>

          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>👤 Cuenta</Text>
            
            <OpcionItem
              icono="account-edit"
              titulo="Editar Perfil"
              subtitulo="Actualiza tu información personal"
              onPress={() => navigation.navigate('User')}
              color="#E91E63"
            />

            <OpcionItem
              icono="lock-reset"
              titulo="Cambiar Contraseña"
              subtitulo="Actualiza tu contraseña"
              onPress={() => Alert.alert("Cambiar contraseña", "Función próximamente")}
              color="#FF9800"
            />

            <OpcionItem
              icono="delete-forever"
              titulo="Eliminar Cuenta"
              subtitulo="Borra permanentemente tu cuenta"
              onPress={() => Alert.alert(
                "Eliminar Cuenta",
                "Esta acción no se puede deshacer. ¿Estás seguro?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Eliminar", style: "destructive" }
                ]
              )}
              color="#F44336"
            />
          </View>


          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>ℹ️ Información</Text>
            
            <OpcionItem
              icono="information"
              titulo="Acerca de TaskFlow"
              subtitulo="Versión 1.0.0"
              onPress={() => Alert.alert("TaskFlow", "Versión 1.0.0\n\n© 2025 TaskFlow App")}
              color="#607D8B"
            />

            <OpcionItem
              icono="help-circle"
              titulo="Ayuda y Soporte"
              subtitulo="¿Necesitas ayuda?"
              onPress={() => Alert.alert("Soporte", "Contacta a: soporte@taskflow.com")}
              color="#9E9E9E"
            />

            <OpcionItem
              icono="file-document"
              titulo="Términos y Condiciones"
              subtitulo="Lee nuestros términos"
              onPress={() => Alert.alert("Términos", "Función próximamente")}
              color="#795548"
            />

            <OpcionItem
              icono="shield-check"
              titulo="Política de Privacidad"
              subtitulo="Cómo protegemos tus datos"
              onPress={() => Alert.alert("Privacidad", "Función próximamente")}
              color="#5D4037"
            />
          </View>

          <View style={styles.seccionCerrar}>
            <TouchableOpacity onPress={handleLogout}>
              <LinearGradient
                colors={['#FF5252', '#F44336']}
                style={styles.botonCerrar}
              >
                <MaterialCommunityIcons name="logout" size={24} color="#fff" />
                <Text style={styles.textoCerrar}>Cerrar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SettingsScreen;
