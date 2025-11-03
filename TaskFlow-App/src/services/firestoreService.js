import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import app from './firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

export const getUserProfile = async (userId) => {
  try {
    if (!userId) {
      console.error("getUserProfile: userId es undefined");
      return null;
    }

    console.log(`[FIRESTORE] Obteniendo perfil de usuario: ${userId}`);
    
    // ✅ CORRECTO: Usa 'db' directamente, no 'collection(db)'
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("[FIRESTORE] ✅ Perfil encontrado:", userSnap.data());
      return userSnap.data();
    } else {
      console.log("[FIRESTORE] ⚠️ No existe documento para usuario:", userId);
      return null;
    }
  } catch (error) {
    console.error("[FIRESTORE] ❌ Error al obtener el perfil del usuario:", error);
    return null;
  }
};

export const saveUserProfile = async (userId, profileData) => {
  if (!userId) {
    throw new Error("Se requiere un ID de usuario");
  }

  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    
    console.log('Perfil guardado exitosamente');
    return true;
  } catch (error) {
    console.error('Error al guardar perfil:', error);
    throw error;
  }
};

export const updateUserProfilePhoto = async (userId, photoURL) => {
  if (!userId) {
    throw new Error("Se requiere un ID de usuario para actualizar el perfil.");
  }

  try {
    // Actualizar en Firebase Auth
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { photoURL: photoURL });
    }

    // Actualizar en Firestore
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      photoURL: photoURL,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    console.log('Foto de perfil actualizada exitosamente en Auth y Firestore.');
    return true;

  } catch (error) {
    console.error('Error updating user profile photo:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    console.log("[FIRESTORE] Obteniendo todos los usuarios");
    
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`[FIRESTORE] ✅ ${users.length} usuarios encontrados`);
    return users;
  } catch (error) {
    console.error("[FIRESTORE] ❌ Error al obtener usuarios:", error);
    return [];
  }
};
