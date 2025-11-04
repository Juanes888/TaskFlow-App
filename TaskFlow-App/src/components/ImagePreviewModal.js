import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';

const colors = {
  principal: '#6366F1',
  secundario: '#8B5CF6',
  fondo: '#F5F5F5',
};

/**
 * Un componente modal que muestra una vista previa de una imagen seleccionada.
 * Proporciona opciones para confirmar o cancelar la selección de la imagen.
 * Muestra un indicador de carga mientras se procesa la confirmación.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {boolean} props.visible - Determina si el modal está visible o no.
 * @param {string} props.imageUri - La URI de la imagen que se va a previsualizar.
 * @param {boolean} props.loading - Si es `true`, muestra un indicador de carga en el botón de confirmar.
 * @param {function} props.onConfirm - Función que se ejecuta al presionar el botón "Confirmar".
 * @param {function} props.onCancel - Función que se ejecuta al presionar "Cancelar" o al cerrar el modal.
 * @returns {React.ReactElement} El componente del modal de vista previa de imagen.
 */
const ImagePreviewModal = ({
  visible,
  imageUri,
  loading,
  onConfirm,
  onCancel,
}) => {
  console.log("ImagePreviewModal - imageUri:", imageUri);
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Vista previa de la imagen</Text>
          
          {imageUri ? (
            <Image 
              source={{ uri: imageUri }} 
              style={styles.previewImage}
              resizeMode="cover"
              onError={(e) => console.error("Error al cargar imagen:", e.nativeEvent.error)}
              onLoad={() => console.log("Imagen cargada exitosamente")}
            />
          ) : (
            <View style={[styles.previewImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
              <Text>No hay imagen</Text>
            </View>
          )}
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]} 
              onPress={onCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.confirmButton]} 
              onPress={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.principal,
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: colors.principal,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ImagePreviewModal;