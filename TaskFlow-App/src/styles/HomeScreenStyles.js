import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const estilos = StyleSheet.create({
  contenedorGlobal: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  gradientBackground: {
    flex: 1,
  },
  contenedorInicio: {
    flex: 1,
  },
  encabezado: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  filaSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  saludo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  usuario: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
  botonPerfil: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientPerfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoPerfil: {
    fontSize: 24,
  },
  
  // Tarjeta de progreso
  tarjetaProgreso: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  gradientProgreso: {
    padding: 20,
  },
  contenidoProgreso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconoProgresoContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconoProgreso: {
    fontSize: 28,
  },
  infoProgresoContainer: {
    flex: 1,
  },
  tituloProgreso: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  textoProgreso: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  porcentajeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  porcentajeProgreso: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  barraProgresoContainer: {
    marginTop: 5,
  },
  barraProgreso: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  rellenoProgreso: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },

  // Sección de tareas
  seccion: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  encabezadoSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  botonAgregar: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  gradientBoton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textoBotonAgregar: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  // Tarjetas de tareas
  tarjetaTarea: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  contenidoTarea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompletado: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoTarea: {
    flex: 1,
  },
  tituloTarea: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  tareaCompletada: {
    textDecorationLine: 'line-through',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  metadataTarea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgePrioridad: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoPrioridad: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Acciones rápidas - RESPONSIVE MEJORADO
  accionesRapidas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  accionCard: {
    width: (width - 64) / 3, // Ajustado para padding (20 + 20) + gaps (12 + 12)
    aspectRatio: 1, // Mantiene proporción cuadrada
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  gradientAccion: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accionIcono: {
    fontSize: width < 380 ? 28 : 32, // Responsive según tamaño de pantalla
    marginBottom: 8,
  },
  accionTexto: {
    color: "#FFFFFF",
    fontSize: width < 380 ? 11 : 12, // Responsive según tamaño de pantalla
    fontWeight: "600",
    textAlign: 'center',
    lineHeight: 16,
  },
});
