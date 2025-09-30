import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import styles from "../styles/SettingsScreenStyles"

const SettingsScreen = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(true)
  const [modoOscuro, setModoOscuro] = useState(false)
  const [sonidos, setSonidos] = useState(true)

  const ElementoAjuste = ({ titulo, subtitulo, onPress, componenteDerecha }) => (
    <TouchableOpacity style={styles.ajusteItem} onPress={onPress}>
      <View style={styles.ajusteContenido}>
        <Text style={styles.ajusteTitulo}>{titulo}</Text>
        {subtitulo && <Text style={styles.ajusteSubtitulo}>{subtitulo}</Text>}
      </View>
      {componenteDerecha || <Text style={styles.flecha}>›</Text>}
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.encabezado}>
        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVolver}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.tituloEncabezado}>Configuración</Text>
        <View style={styles.espaciador} />
      </View>

      <ScrollView style={styles.contenedorScroll}>
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Preferencias</Text>

          <ElementoAjuste titulo="Notificaciones" subtitulo="Recibir recordatorios de tareas" componenteDerecha={
              <Switch value={notificaciones} onValueChange={setNotificaciones}/>} />
          <ElementoAjuste titulo="Modo oscuro" subtitulo="Cambiar apariencia de la app" componenteDerecha={
              <Switch value={modoOscuro} onValueChange={setModoOscuro} />} />
          <ElementoAjuste
            titulo="Sonidos"
            subtitulo="Efectos de sonido y alertas"
            componenteDerecha={
              <Switch value={sonidos} onValueChange={setSonidos} />
            }
          />
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Cronómetro</Text>
          <ElementoAjuste titulo="Duración concentración" subtitulo="25 minutos" />
          <ElementoAjuste titulo="Descanso corto" subtitulo="5 minutos" />
          <ElementoAjuste titulo="Descanso largo" subtitulo="15 minutos" />
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Datos</Text>
          <ElementoAjuste titulo="Exportar datos" subtitulo="Guardar tareas y estadísticas" />
          <ElementoAjuste titulo="Importar datos" subtitulo="Restaurar desde archivo" />
          <ElementoAjuste titulo="Limpiar datos" subtitulo="Eliminar todas las tareas" />
        </View>

        <View style={styles.seccionBox}>
          <Text style={styles.tituloSeccion}>Soporte</Text>
          <ElementoAjuste titulo="Ayuda" subtitulo="Preguntas frecuentes" />
          <ElementoAjuste titulo="Contacto" subtitulo="Enviar comentarios" />
          <ElementoAjuste titulo="Acerca de" subtitulo="Versión 1.0.0" />
        </View>

        <View style={styles.seccionCerrar}>
          <TouchableOpacity style={styles.botonCerrar} onPress={() => navigation.replace("Login")}> 
            <MaterialIcons name="logout" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.textoCerrar}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen
