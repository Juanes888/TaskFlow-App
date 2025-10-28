import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const googleAuthConfig = {
  expoClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
  iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
};

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest(googleAuthConfig);

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();
      
      if (result.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        return userCredential.user;
      }
      return null;
    } catch (error) {
      console.error("Error en autenticación con Google:", error);
      throw error;
    }
  };

  return {
    signInWithGoogle,
    request,
  };
};