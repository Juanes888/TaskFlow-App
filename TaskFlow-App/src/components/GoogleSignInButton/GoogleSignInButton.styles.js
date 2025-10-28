import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  separador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  textoSeparador: {
    marginHorizontal: 10,
    color: '#757575',
    fontSize: 14,
  },
  botonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconoGoogle: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  textoGoogle: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
});
