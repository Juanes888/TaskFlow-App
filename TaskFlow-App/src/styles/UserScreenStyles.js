import { StyleSheet } from "react-native";
import { colors } from "../constants/colors.js";

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  backgroundColor: colors.background,
  },
  encabezado: {
    paddingTop: espaciado.grande,
    paddingBottom: espaciado.extraGrande,
    paddingHorizontal: espaciado.mediano,
  },
  botonVolver: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: espaciado.mediano,
  },
  textoBotonVolver: {
    fontSize: 24,
  color: colors.surface,
    fontWeight: "bold",
  },
  seccionPerfil: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: espaciado.mediano,
  },
  textoAvatar: {
    fontSize: 40,
  },
  nombreUsuario: {
    ...tipografia.h2,
  color: colors.surface,
    marginBottom: espaciado.pequeno,
  },
  correoUsuario: {
    ...tipografia.cuerpo,
  color: colors.surface,
    opacity: 0.8,
    marginBottom: espaciado.mediano,
  },
  botonEditar: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: espaciado.grande,
    paddingVertical: espaciado.chico,
    borderRadius: 20,
  },
  textoBotonEditar: {
    ...tipografia.cuerpoChico,
  color: colors.surface,
    fontWeight: "600",
  },
  seccion: {
    padding: espaciado.mediano,
  },
  tituloSeccion: {
    ...tipografia.h3,
  color: colors.text,
    marginBottom: espaciado.mediano,
  },
  cuadriculaEstadisticas: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tarjetaEstadistica: {
    width: "48%",
    alignItems: "center",
    marginBottom: espaciado.chico,
  },
  iconoEstadistica: {
    fontSize: 24,
    marginBottom: espaciado.pequeno,
  },
  valorEstadistica: {
    ...tipografia.h2,
  color: colors.primary,
    fontWeight: "bold",
    marginBottom: espaciado.pequeno,
  },
  etiquetaEstadistica: {
    ...tipografia.etiqueta,
  color: colors.textSecondary,
    textAlign: "center",
  },
  tarjetaLogro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: espaciado.chico,
  },
  contenidoLogro: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconoLogro: {
    fontSize: 24,
    marginRight: espaciado.mediano,
  },
  iconoBloqueado: {
    opacity: 0.5,
  },
  infoLogro: {
    flex: 1,
  },
  tituloLogro: {
    ...tipografia.cuerpo,
  color: colors.text,
    fontWeight: "600",
    marginBottom: 2,
  },
  descripcionLogro: {
    ...tipografia.etiqueta,
  color: colors.textSecondary,
  },
  textoBloqueado: {
    opacity: 0.5,
  },
  insigniaDesbloqueado: {
    width: 24,
    height: 24,
    borderRadius: 12,
  backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  textoDesbloqueado: {
    color: colores.superficie,
    fontSize: 12,
    fontWeight: "bold",
  },
  tarjetaProgreso: {
  backgroundColor: colors.surface,
  },
  encabezadoProgreso: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: espaciado.chico,
  },
  tituloProgreso: {
    ...tipografia.cuerpo,
  color: colors.text,
    fontWeight: "600",
  },
  porcentajeProgreso: {
    ...tipografia.h3,
  color: colors.primary,
    fontWeight: "bold",
  },
  barraProgreso: {
    height: 8,
  backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: espaciado.chico,
  },
  rellenoProgreso: {
    height: "100%",
  backgroundColor: colors.primary,
    borderRadius: 4,
  },
  textoProgreso: {
    ...tipografia.etiqueta,
  color: colors.textSecondary,
  },
  tarjetaAccion: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: espaciado.chico,
  },
  iconoAccion: {
    fontSize: 20,
    marginRight: espaciado.mediano,
  },
  textoAccion: {
    ...tipografia.cuerpo,
  color: colors.text,
    flex: 1,
  },
  flechaAccion: {
    fontSize: 20,
  color: colors.textLight,
    fontWeight: "bold",
  },
})

export default estilos

