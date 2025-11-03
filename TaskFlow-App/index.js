import 'react-native-get-random-values'; // ¡Añade esta línea al principio!

import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// Asegura que el entorno de la app se configure correctamente
registerRootComponent(App);
