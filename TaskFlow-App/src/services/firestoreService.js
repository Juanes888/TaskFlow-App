import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import app from './firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Obtiene el perfil de un usuario desde Firestore.
 * @param {string} userId - El ID del usuario a buscar.
 * @returns {Promise<Object|null>} Una promesa que resuelve con los datos del perfil del usuario o null si no se encuentra.
 */
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

/**
 * Guarda o actualiza el perfil de un usuario en Firestore.
 * @param {string} userId - El ID del usuario cuyo perfil se va a guardar.
 * @param {Object} profileData - Un objeto con los datos del perfil a guardar.
 * @returns {Promise<boolean>} Una promesa que resuelve a true si la operación fue exitosa.
 * @throws {Error} Lanza un error si no se proporciona un ID de usuario o si falla la escritura.
 */
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

/**
 * Actualiza la foto de perfil de un usuario tanto en Firebase Authentication como en Firestore.
 * @param {string} userId - El ID del usuario.
 * @param {string} photoURL - La nueva URL de la foto de perfil.
 * @returns {Promise<boolean>} Una promesa que resuelve a true si la actualización fue exitosa.
 * @throws {Error} Lanza un error si no se proporciona un ID de usuario o si la actualización falla.
 */
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

/**
 * Obtiene una lista de todos los usuarios registrados en Firestore.
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con un array de objetos de usuario. Cada objeto incluye el id del documento y los datos del usuario. Retorna un array vacío en caso de error.
 */
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
