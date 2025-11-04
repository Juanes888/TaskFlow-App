import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/Colors";

/**
 * Pantalla de bienvenida (Splash Screen) que se muestra al iniciar la aplicación.
 * Muestra el logo y el nombre de la aplicación durante un breve período antes de
 * redirigir al usuario a la pantalla de inicio de sesión.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {React.ReactElement} El componente de la pantalla de bienvenida.
 */
const SplashScreen = ({ navigation }) => {
  /**
   * Efecto que se ejecuta al montar el componente.
   * Inicia un temporizador de 2 segundos y, una vez transcurrido,
   * redirige al usuario a la pantalla 'Login'.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.contenedor}>
      <View style={styles.contenido}>
        <Text style={styles.logo}>📋</Text>
        <Text style={styles.titulo}>TaskFlow</Text>
        <Text style={styles.subtitulo}>Organiza tu día, fluye con tus tareas</Text>
        <ActivityIndicator size="large" color={colors.surface} style={{ marginTop: 40 }} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contenido: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.surface,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.8,
    marginBottom: 24,
    textAlign: "center",
  },
});

export default SplashScreen;
