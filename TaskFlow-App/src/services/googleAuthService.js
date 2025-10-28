import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const useGoogleAuth = () => {
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            return await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error en autenticación de Google:', error);
            throw error;
        }
    };

    return { signInWithGoogle };
};

