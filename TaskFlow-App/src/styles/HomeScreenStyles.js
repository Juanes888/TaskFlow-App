import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const estilos = StyleSheet.create({
  contenedorGlobal: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contenedorInicio: {
    flex: 1,
  },
  encabezado: {
    padding: 16,
  },
  filaSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  saludo: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  usuario: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  botonPerfil: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoPerfil: {
    fontSize: 20,
  },
  tarjeta: {
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  tarjetaProgreso: {
    backgroundColor: colors.primary,
  },
  tituloProgreso: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.surface,
    marginBottom: 8,
  },
  infoProgreso: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  textoProgreso: {
    fontSize: 14,
    color: colors.surface,
  },
  porcentajeProgreso: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.surface,
  },
  barraProgreso: {
    height: 8,
    backgroundColor: colors.liquid,
    borderRadius: 4,
    overflow: "hidden",
  },
  rellenoProgreso: {
    height: "100%",
    backgroundColor: colors.surface,
  },
  seccion: {
    padding: 16,
  },
  encabezadoSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  botonAgregar: {
    backgroundColor: colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  textoBotonAgregar: {
    fontSize: 14,
    color: colors.surface,
    fontWeight: "600",
  },
  accionesRapidas: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  accionRapida: {
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    minWidth: 80,
    elevation: 2,
  },
  iconoAccion: {
    fontSize: 24,
    marginBottom: 4,
  },
  textoAccion: {
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
  },
});
