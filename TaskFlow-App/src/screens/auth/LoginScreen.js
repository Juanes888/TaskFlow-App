import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { estilos } from "../../styles/LoginScreenStyles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarLogin = async () => {
    if (!correo || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      // La navegación se manejará automáticamente por el listener de estado de autenticación en App.js
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.contenedor} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={estilos.fondoGradiente}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={estilos.contenido}>
            <View style={estilos.encabezado}>
              <Text style={estilos.logo}>📋</Text>
              <Text style={estilos.titulo}>Bienvenido a TaskFlow</Text>
              <Text style={estilos.subtitulo}>Inicia sesión para continuar</Text>
            </View>

            <View style={estilos.formularioBox}>
              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Correo electrónico</Text>
                <TextInput 
                  style={estilos.input} 
                  placeholder="tu@correo.com"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={correo} 
                  onChangeText={setCorreo} 
                  keyboardType="email-address" 
                  autoCapitalize="none"
                />
              </View>

              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Contraseña</Text>
                <TextInput 
                  style={estilos.input} 
                  placeholder="••••••••" 
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={contrasena} 
                  onChangeText={setContrasena} 
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={estilos.botonOlvido}>
                <Text style={estilos.textoOlvido}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={manejarLogin}>
                <LinearGradient
                  colors={['#FF5252', '#E91E63']}
                  style={estilos.botonPrincipal}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={estilos.registroContenedor}>
                <Text style={estilos.textoRegistro}>¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text style={estilos.linkRegistro}>Regístrate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
