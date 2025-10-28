import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { auth } from "../services/firebaseConfig";
import { saveUserProfile, getUserProfile } from "../services/firestoreService"; // Asegúrate de que esta función esté implementada
import { selectAndUploadImage } from "../services/cloudinaryService";

const EditProfileScreen = ({ navigation }) => {
    const user = auth.currentUser;
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const profile = await getUserProfile(user.uid); // Obtener el perfil del usuario
                if (profile) {
                    setName(profile.name);
                    setPhoto(profile.photo);
                }
            }
        };
        fetchUserProfile();
    }, [user]);

    const handleImagePick = async () => {
        setLoading(true);
        const url = await selectAndUploadImage();
        if (url) setPhoto(url);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!user) return;
        await saveUserProfile(user.uid, { name, photo }); // Guardar el perfil actualizado
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>Editar Perfil</Text>
            <TouchableOpacity onPress={handleImagePick} style={{ alignItems: "center", marginBottom: 16 }}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <Image
                        source={photo ? { uri: photo } : require("../../assets/default-profile.png")}
                        style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee" }}
                    />
                )}
                <Text style={{ color: "#1976d2", marginTop: 8 }}>Cambiar foto</Text>
            </TouchableOpacity>
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 24 }}
            />
            <TouchableOpacity
                onPress={handleSave}
                style={{ backgroundColor: "#1976d2", padding: 14, borderRadius: 8, alignItems: "center" }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfileScreen;
