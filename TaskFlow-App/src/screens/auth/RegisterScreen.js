import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { estilos } from "../../styles/RegisterScreenStyles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const manejarRegistro = async () => {
    try {
      await createUserWithEmailAndPassword(auth, correo, contrasena);
      navigation.replace("Login");
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.contenedor} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={["#E3F2FD", "#FFFFFF"]} style={estilos.fondoGradiente}>
        <ScrollView contentContainerStyle={estilos.scrollContenido}>
          <View style={estilos.contenido}>
            <View style={estilos.encabezado}>
              <Text style={estilos.logo}>📋</Text>
              <Text style={estilos.titulo}>Únete a TaskFlow</Text>
              <Text style={estilos.subtitulo}>
                Crea tu cuenta y comienza a organizarte
              </Text>
            </View>

            <View style={estilos.formularioBox}>
              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Nombre completo</Text>
                <TextInput style={estilos.input} placeholder="juanito perez" value={nombre} onChangeText={setNombre}/>
              </View>

              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Correo electrónico</Text>
                <TextInput style={estilos.input} placeholder="Juanitoperez@email.com" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none"/>
              </View>

              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Contraseña</Text>
                <TextInput style={estilos.input} placeholder="••••••••" value={contrasena} onChangeText={setContrasena} secureTextEntry/>
              </View>
              <View style={estilos.grupoInput}>
                <Text style={estilos.etiqueta}>Confirmar contraseña</Text>
                <TextInput style={estilos.input} placeholder="••••••••" value={confirmarContrasena} onChangeText={setConfirmarContrasena} secureTextEntry/>
              </View>
              <TouchableOpacity style={estilos.botonPrincipal} onPress={manejarRegistro}>
                <Text style={estilos.textoBoton}>Crear Cuenta</Text>
              </TouchableOpacity>

              <View style={estilos.loginContenedor}>
                <Text style={estilos.textoLogin}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={estilos.linkLogin}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
