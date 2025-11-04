import * as ImagePicker from 'expo-image-picker';

const CLOUDINARY_CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/**
 * Solicita permisos al usuario para acceder a la galería de medios.
 * Muestra una alerta si los permisos no son concedidos.
 * @async
 * @returns {Promise<boolean>} `true` si los permisos fueron concedidos, `false` en caso contrario.
 */
export const requestImagePermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Lo siento, necesitamos permisos para acceder a tu galería de fotos.');
        return false;
    }
    return true;
};

/**
 * Abre la galería de imágenes del dispositivo para que el usuario seleccione una.
 * Primero solicita los permisos necesarios.
 * @async
 * @returns {Promise<ImagePicker.ImagePickerAsset|null>} Un objeto con la información de la imagen seleccionada, o `null` si el usuario cancela o no da permisos.
 */
export const pickImage = async () => {
    const hasPermission = await requestImagePermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], 
        allowsEditing: false,
        quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0];
    }
    return null;
};

/**
 * Sube una imagen a Cloudinary utilizando las credenciales configuradas en las variables de entorno.
 * Construye un `FormData` con la imagen y la envía a la API de Cloudinary.
 * @async
 * @param {string} imageUri - La URI local de la imagen a subir.
 * @throws {Error} Si las credenciales de Cloudinary no están configuradas o si la subida falla.
 * @returns {Promise<string>} La URL segura de la imagen subida a Cloudinary.
 */
export const uploadImageToCloudinary = async (imageUri) => {
    try {
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            console.error('Credenciales faltantes:', { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET });
            throw new Error('Las credenciales de Cloudinary no están configuradas');
        }

        const formData = new FormData();
        if (typeof imageUri === 'string' && imageUri.startsWith('blob:')) {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            formData.append('file', blob, 'photo.jpg');
        } else if (typeof imageUri === 'string' && imageUri.startsWith('data:')) {
            formData.append('file', imageUri);
        } else {
            const localUri = imageUri;
            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image/jpeg';
            
            formData.append('file', {
                uri: localUri,
                name: filename,
                type,
            });
        }
        
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        console.log('Uploading to Cloudinary with:', {
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        });

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Cloudinary response error:', responseData);
            throw new Error(responseData.error?.message || 'Error al subir la imagen');
        }

        console.log('Upload successful:', responseData);
        return responseData.secure_url;
    } catch (error) {
        console.error('Error detallado al subir imagen a Cloudinary:', error);
        throw new Error(`Error al subir la imagen: ${error.message}`);
    }
};

/**
 * Orquesta el proceso completo de seleccionar una imagen de la galería y subirla a Cloudinary.
 * Es una función de conveniencia que combina `pickImage` y `uploadImageToCloudinary`.
 * @async
 * @returns {Promise<string|null>} La URL segura de la imagen subida, o `null` si el proceso falla o es cancelado.
 */
export const selectAndUploadImage = async () => {
    try {
        const imageAsset = await pickImage();
        if (!imageAsset) return null;

        const imageUrl = await uploadImageToCloudinary(imageAsset.uri);
        return imageUrl;
    } catch (error) {
        console.error('Error in selectAndUploadImage:', error);
        alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
        return null;
    }
};