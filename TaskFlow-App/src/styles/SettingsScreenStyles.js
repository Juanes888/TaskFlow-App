import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contenedorScroll: {
    flex: 1,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  botonVolver: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textoVolver: {
    fontSize: 24,
    color: "#1976d2",
    fontWeight: "bold",
  },
  tituloEncabezado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
  },
  espaciador: {
    width: 40,
  },
  seccion: {
    marginTop: 24,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  ajusteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  ajusteContenido: {
    flex: 1,
  },
  ajusteTitulo: {
    fontSize: 14,
    color: "#212121",
    marginBottom: 2,
  },
  ajusteSubtitulo: {
    fontSize: 12,
    color: "#757575",
  },
  flecha: {
    fontSize: 20,
    color: "#9e9e9e",
    fontWeight: "bold",
  },
  seccionCerrar: {
    padding: 16,
    marginTop: 32,
  },
  botonCerrar: {
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoCerrar: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default styles;
