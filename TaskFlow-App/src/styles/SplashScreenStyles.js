import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

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

export default styles;
