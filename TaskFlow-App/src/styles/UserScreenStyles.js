import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const estilos = StyleSheet.create({
  contenedorGlobal: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gradientBackground: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
  },
  encabezado: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  botonVolver: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotonVolver: {
    fontSize: 24,
    color: '#fff',
  },
  seccionPerfil: {
    alignItems: 'center',
    marginBottom: 30,
  },
  gradientAvatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 4,
    marginBottom: 15,
  },
  avatarContainer: {
    width: 122,
    height: 122,
    borderRadius: 61,
    backgroundColor: '#2a2a3e',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 61,
  },
  avatarIcon: {
    fontSize: 50,
  },
  nombreUsuario: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  correoUsuario: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
  },
  botonEditar: {
    marginTop: 10,
  },
  gradientBotonEditar: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  textoBotonEditar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  seccion: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  cuadriculaEstadisticas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tarjetaEstadistica: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientEstadistica: {
    padding: 20,
    alignItems: 'center',
  },
  iconoEstadistica: {
    fontSize: 30,
    marginBottom: 10,
  },
  valorEstadistica: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  etiquetaEstadistica: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  tarjetaProgreso: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  encabezadoProgreso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tituloProgreso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  porcentajeProgreso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5252',
  },
  barraProgreso: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  rellenoProgreso: {
    height: '100%',
    borderRadius: 6,
  },
  textoProgreso: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  encabezadoLogros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  contadorLogros: {
    backgroundColor: 'rgba(255, 82, 82, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  textoContadorLogros: {
    color: '#FF5252',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tarjetaLogro: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contenidoLogro: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconoLogroContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 82, 82, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconoBloqueado: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.5,
  },
  iconoLogro: {
    fontSize: 24,
  },
  infoLogro: {
    flex: 1,
  },
  tituloLogro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  descripcionLogro: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  textoBloqueado: {
    opacity: 0.5,
  },
  insigniaDesbloqueado: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoDesbloqueado: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  insigniaBloqueado: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBloqueado2: {
    fontSize: 14,
    opacity: 0.5,
  },
  tarjetaAccion: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconoAccion: {
    fontSize: 24,
    marginRight: 15,
  },
  textoAccion: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  flechaAccion: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});


export default estilos;

