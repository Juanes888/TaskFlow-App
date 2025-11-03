import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, browserLocalPersistence } from 'firebase/auth'; 
import { getFirestore } from "firebase/firestore";
import { Platform } from 'react-native';

// 🔍 DEBUG: Imprime TODAS las variables de entorno
console.log("[ENV] 🔍 Variables de entorno cargadas:", {
    EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    EXPO_PUBLIC_AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    EXPO_PUBLIC_PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
    EXPO_PUBLIC_STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    EXPO_PUBLIC_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_APP_ID: process.env.EXPO_PUBLIC_APP_ID,
});

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
};

console.log("[FIREBASE] 🔧 Configuración cargada:", {
    projectId: firebaseConfig.projectId,
    hasApiKey: !!firebaseConfig.apiKey,
    hasAuthDomain: !!firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
    apiKeyLength: firebaseConfig.apiKey?.length,
});

// ✅ Validación de configuración
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("[FIREBASE] ❌ ERROR CRÍTICO: Configuración incompleta");
    console.error("API Key presente:", !!firebaseConfig.apiKey);
    console.error("Project ID presente:", !!firebaseConfig.projectId);
    throw new Error("Firebase no configurado correctamente. Revisa tu archivo .env");
}

const app = initializeApp(firebaseConfig);

// Configurar Auth según la plataforma
let auth;
if (Platform.OS === 'web') {
  // Para web, usa getAuth con persistencia por defecto
  auth = getAuth(app);
} else {
  // Para React Native (iOS/Android)
  const { getReactNativePersistence } = require('firebase/auth');
  const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

export { auth };
export const db = getFirestore(app);
export default app;