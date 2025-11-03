import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  fondoGradiente: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  encabezado: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  formularioBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  grupoInput: {
    marginBottom: 16,
  },
  etiqueta: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#FFFFFF",
  },
  botonOlvido: {
    alignSelf: "flex-end",
    marginBottom: 24,
    paddingVertical: 4,
  },
  textoOlvido: {
    fontSize: 14,
    color: "#FF5252",
    fontWeight: "600",
  },
  botonPrincipal: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  textoBoton: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  registroContenedor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  textoRegistro: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  linkRegistro: {
    fontSize: 14,
    color: "#FF5252",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
