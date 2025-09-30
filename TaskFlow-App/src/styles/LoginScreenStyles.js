import { StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

export const estilos = StyleSheet.create({
  formularioBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    marginHorizontal: 8,
    marginBottom: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },
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
    backgroundColor: '#f7f7fa',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  botonOlvido: {
    alignSelf: "flex-end",
    marginBottom: 24,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  textoOlvido: {
    fontSize: 13,
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  botonPrincipal: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
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
