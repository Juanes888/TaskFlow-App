import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './GoogleSignInButton.styles';

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
