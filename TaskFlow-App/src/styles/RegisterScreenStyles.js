import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fondoGradiente: {
    flex: 1,
  },
  scrollContenido: {
    flexGrow: 1,
  },
  contenido: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    paddingVertical: 32,
  },
  encabezado: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    fontSize: 60,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  formulario: {
    width: "100%",
  },
  grupoInput: {
    marginBottom: 16,
  },
  etiqueta: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  botonPrincipal: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  textoBoton: {
    fontSize: 16,
    color: colors.surface,
    fontWeight: "bold",
  },
  loginContenedor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textoLogin: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  linkLogin: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
  },
});
