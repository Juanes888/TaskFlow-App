import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './GoogleSignInButton.styles';

/**
 * Un componente de botón reutilizable para iniciar sesión con Google.
 * Muestra un separador y un botón con el logo y texto de Google.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onPress - La función que se ejecuta cuando el usuario presiona el botón.
 * @returns {React.ReactElement} El componente del botón de inicio de sesión de Google.
 */
const GoogleSignInButton = ({ onPress }) => {
  return (
    <>
      <View style={styles.separador}>
        <View style={styles.linea} />
        <Text style={styles.textoSeparador}>O continúa con</Text>
        <View style={styles.linea} />
      </View>
      
      <TouchableOpacity style={styles.botonGoogle} onPress={onPress}>
        <Image 
          source={require('../../../assets/iconoGoogle.jpg')} 
          style={styles.iconoGoogle}
          resizeMode="contain"
        />
        <Text style={styles.textoGoogle}>Continuar con Google</Text>
      </TouchableOpacity>
    </>
  );
};

export default GoogleSignInButton;
