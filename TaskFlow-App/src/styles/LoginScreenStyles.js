import { StyleSheet } from "react-native";
import { colors } from "../constants/colors.js";

export const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fondoGradiente: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  encabezado: {
    alignItems: "center",
    marginBottom: 48,
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
  botonOlvido: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  textoOlvido: {
    fontSize: 13,
    color: colors.primary,
  },
  botonPrincipal: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  textoBoton: {
    fontSize: 16,
    color: colors.surface,
    fontWeight: "bold",
  },
  registroContenedor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textoRegistro: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  linkRegistro: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
  },
});
