import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { estilos } from "../styles/LoginScreenStyles";

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarLogin = () => {
    navigation.replace("Inicio");
  };

  return (
    <KeyboardAvoidingView style={estilos.contenedor} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={["#E3F2FD", "#FFFFFF"]} style={estilos.fondoGradiente}>
        <View style={estilos.contenido}>
          <View style={estilos.encabezado}>
            <Text style={estilos.logo}>📋</Text>
            <Text style={estilos.titulo}>Bienvenido a TaskFlow</Text>
            <Text style={estilos.subtitulo}>Inicia sesión para continuar</Text>
          </View>

          <View style={estilos.formulario}>
            <View style={estilos.grupoInput}>
              <Text style={estilos.etiqueta}>Correo electrónico</Text>
              <TextInput style={estilos.input} placeholder="juanitoperez@gmail.com" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none"/>
            </View>

            <View style={estilos.grupoInput}>
              <Text style={estilos.etiqueta}>Contraseña</Text>
              <TextInput style={estilos.input} placeholder="••••••••" value={contrasena} onChangeText={setContrasena} secureTextEntry/>
            </View>

            <TouchableOpacity style={estilos.botonOlvido}>
              <Text style={estilos.textoOlvido}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botonPrincipal}
              onPress={manejarLogin}
            >
              <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <View style={estilos.registroContenedor}>
              <Text style={estilos.textoRegistro}>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
                <Text style={estilos.linkRegistro}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
