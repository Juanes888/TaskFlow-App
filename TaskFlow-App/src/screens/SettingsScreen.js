import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, Image, ActivityIndicator, TextInput, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from "../services/firebaseConfig";
import { saveUserProfile, getUserProfile } from "../services/firestoreService";
import { selectAndUploadImage } from "../services/cloudinaryService";
import styles from "../styles/SettingsScreenStyles";

const SettingsScreen = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [sonidos, setSonidos] = useState(true);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [initialData, setInitialData] = useState({ name: "", photo: "" });
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setLoading(true);
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            const userName = profile.name || "";
            const userPhoto = profile.photo || "";
            setName(userName);
            setPhoto(userPhoto);
            setInitialData({ name: userName, photo: userPhoto });
          }
        } catch (error) {
          console.error("Error al cargar perfil:", error);
          Alert.alert("Error", "No se pudo cargar tu perfil");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleImagePick = async () => {
    if (!isEditing) return;
    
    setLoading(true);
    try {
      const url = await selectAndUploadImage();
      if (url) {
        setPhoto(url);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo cargar la imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(initialData.name);
    setPhoto(initialData.photo);
  };

  const handleSave = async () => {
    if (!user) {
      Alert.alert("Error", "No hay usuario autenticado");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre");
      return;
    }

    setSaving(true);
    
    try {
      const updatedProfile = { 
        name: name.trim(), 
        photo: photo 
      };
      
      await saveUserProfile(user.uid, updatedProfile);
      
      // Actualizar estados en el orden correcto
      const trimmedName = name.trim();
      setName(trimmedName);
      setInitialData({ name: trimmedName, photo });
      
      // Mostrar mensaje de éxito
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      Alert.alert("Error", "No se pudo guardar tu perfil. Inténtalo de nuevo.");
    } finally {
      // IMPORTANTE: Siempre cerrar el modo edición y detener el loading
      setSaving(false);
      setIsEditing(false);
    }
  };

  const hasChanges = () => {
    return name.trim() !== initialData.name || photo !== initialData.photo;
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

      <ScrollView style={styles.contenedorScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.seccionBox}>
          <View style={styles.perfilHeader}>
            <Text style={styles.tituloSeccion}>Mi Perfil</Text>
            {!isEditing && (
              <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                <MaterialIcons name="edit" size={20} color="#1976d2" />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              onPress={handleImagePick} 
              style={styles.profileImageContainer}
              disabled={loading || !isEditing}
            >
              {loading ? (
                <View style={[styles.profileImage, { justifyContent: 'center', alignItems: 'center' }]}>
                  <ActivityIndicator size="large" color="#1976d2" />
                </View>
              ) : (
                <>
                  <Image
                    source={photo ? { uri: photo } : require("../../assets/default-profile.png")}
                    style={styles.profileImage}
                  />
                  {isEditing && (
                    <View style={styles.profileImageOverlay}>
                      <MaterialIcons name="camera-alt" size={20} color="#fff" />
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
            {isEditing && (
              <Text style={styles.changePhotoText}>Toca para cambiar foto</Text>
            )}
          </View>

          <View style={styles.profileInfoContainer}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              placeholder="Ingresa tu nombre"
              value={name}
              onChangeText={setName}
              style={[
                styles.profileInput,
                !isEditing && styles.profileInputDisabled
              ]}
              editable={isEditing && !saving}
            />

            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <TextInput
              value={user?.email || ""}
              style={[styles.profileInput, styles.profileInputDisabled]}
              editable={false}
            />
          </View>

          {isEditing && (
            <View style={styles.editButtonsContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={[styles.actionButton, styles.cancelButton]}
                disabled={saving}
              >
                <MaterialIcons name="close" size={20} color="#666" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                style={[
                  styles.actionButton,
                  styles.saveButton,
                  (saving || !hasChanges()) && styles.saveButtonDisabled
                ]}
                disabled={saving || !hasChanges()}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <MaterialIcons name="check" size={20} color="#fff" />
                    <Text style={styles.saveButtonText}>Guardar</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {showSuccess && (
            <View style={styles.successMessage}>
              <MaterialIcons name="check-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.successMessageText}>Perfil actualizado exitosamente</Text>
            </View>
          )}
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Preferencias</Text>
          <ElementoAjuste 
            titulo="Notificaciones" 
            subtitulo="Recibir recordatorios de tareas" 
            componenteDerecha={<Switch value={notificaciones} onValueChange={setNotificaciones}/>} 
          />
          <ElementoAjuste 
            titulo="Modo oscuro" 
            subtitulo="Cambiar apariencia de la app" 
            componenteDerecha={<Switch value={modoOscuro} onValueChange={setModoOscuro} />} 
          />
          <ElementoAjuste
            titulo="Sonidos"
            subtitulo="Efectos de sonido y alertas"
            componenteDerecha={<Switch value={sonidos} onValueChange={setSonidos} />}
          />
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
