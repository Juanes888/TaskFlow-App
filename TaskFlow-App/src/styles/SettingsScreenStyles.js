import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  seccionBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 8,
    paddingBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  ajusteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  ajusteContenido: {
    flex: 1,
  },
  ajusteTitulo: {
    fontSize: 15,
    color: "#222",
    marginBottom: 2,
    fontWeight: '500',
  },
  ajusteSubtitulo: {
    fontSize: 12,
    color: "#757575",
    marginTop: 1,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#d32f2f",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 24,
  },
  textoCerrar: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default styles;
