import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  botonVolver: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  seccion: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  // Switch Items
  switchItem: {
    marginBottom: 10,
  },
  switchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  switchTextos: {
    flex: 1,
  },
  switchTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  switchSubtitulo: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  // Opción Items
  opcionItem: {
    marginBottom: 10,
  },
  opcionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  opcionTextos: {
    flex: 1,
  },
  opcionTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  opcionSubtitulo: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  // Cerrar Sesión
  seccionCerrar: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  botonCerrar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
  },
  textoCerrar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;