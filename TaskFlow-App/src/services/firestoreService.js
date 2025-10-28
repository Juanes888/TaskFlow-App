import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const saveUserProfile = async (uid, data) => {
    await setDoc(doc(db, "users", uid), data, { merge: true });
};

export const getUserProfile = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (uid, data) => {
    await updateDoc(doc(db, "users", uid), data);
};
