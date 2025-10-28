import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, Image, ActivityIndicator, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from "../services/firebaseConfig";
import { saveUserProfile, getUserProfile } from "../services/firestoreService"; // Asegúrate de que esta función esté implementada
import { selectAndUploadImage } from "../services/cloudinaryService";
import styles from "../styles/SettingsScreenStyles";

const SettingsScreen = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [sonidos, setSonidos] = useState(true);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const profile = await getUserProfile(user.uid); // Obtener el perfil del usuario
        if (profile) {
          setName(profile.name);
          setPhoto(profile.photo);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleImagePick = async () => {
    setLoading(true);
    const url = await selectAndUploadImage();
    if (url) setPhoto(url);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    await saveUserProfile(user.uid, { name, photo }); // Guardar el perfil actualizado
  };

  const ElementoAjuste = ({ titulo, subtitulo, onPress, componenteDerecha }) => (
    <TouchableOpacity style={styles.ajusteItem} onPress={onPress}>
      <View style={styles.ajusteContenido}>
        <Text style={styles.ajusteTitulo}>{titulo}</Text>
        {subtitulo && <Text style={styles.ajusteSubtitulo}>{subtitulo}</Text>}
      </View>
      {componenteDerecha || <Text style={styles.flecha}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.encabezado}>
        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVolver}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.tituloEncabezado}>Configuración</Text>
        <View style={styles.espaciador} />
      </View>

      <ScrollView style={styles.contenedorScroll}>
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Preferencias</Text>

          <ElementoAjuste titulo="Notificaciones" subtitulo="Recibir recordatorios de tareas" componenteDerecha={
              <Switch value={notificaciones} onValueChange={setNotificaciones}/>} />
          <ElementoAjuste titulo="Modo oscuro" subtitulo="Cambiar apariencia de la app" componenteDerecha={
              <Switch value={modoOscuro} onValueChange={setModoOscuro} />} />
          <ElementoAjuste
            titulo="Sonidos"
            subtitulo="Efectos de sonido y alertas"
            componenteDerecha={
              <Switch value={sonidos} onValueChange={setSonidos} />
            }
          />
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Perfil</Text>
          <TouchableOpacity onPress={handleImagePick} style={{ alignItems: "center", marginBottom: 16 }}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Image
                source={photo ? { uri: photo } : require("../../assets/default-profile.png")}
                style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee" }}
              />
            )}
            <Text style={{ color: "#1976d2", marginTop: 8 }}>Cambiar foto</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 24 }}
          />
          <TouchableOpacity
            onPress={handleSave}
            style={{ backgroundColor: "#1976d2", padding: 14, borderRadius: 8, alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Datos</Text>
          <ElementoAjuste titulo="Exportar datos" subtitulo="Guardar tareas y estadísticas" />
          <ElementoAjuste titulo="Importar datos" subtitulo="Restaurar desde archivo" />
          <ElementoAjuste titulo="Limpiar datos" subtitulo="Eliminar todas las tareas" />
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Soporte</Text>
          <ElementoAjuste titulo="Ayuda" subtitulo="Preguntas frecuentes" />
          <ElementoAjuste titulo="Contacto" subtitulo="Enviar comentarios" />
          <ElementoAjuste titulo="Acerca de" subtitulo="Versión 1.0.0" />
        </View>

        <View style={styles.seccionCerrar}>
          <TouchableOpacity style={styles.botonCerrar} onPress={() => navigation.replace("Login")}> 
            <MaterialIcons name="logout" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.textoCerrar}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
