const estadisticas = [
  { etiqueta: "Tareas completadas", valor: "127", icono: "✅" },
  { etiqueta: "Días activos", valor: "23", icono: "📅" },
  { etiqueta: "Tiempo enfocado", valor: "45h", icono: "⏱️" },
  { etiqueta: "Racha actual", valor: "7", icono: "🔥" },
];

const logros = [
  { titulo: "Primera tarea", descripcion: "Completaste tu primera tarea", icono: "🎯", desbloqueado: true },
  { titulo: "Productivo", descripcion: "Completa 10 tareas en un día", icono: "⚡", desbloqueado: true },
  { titulo: "Constante", descripcion: "Mantén una racha de 7 días", icono: "🔥", desbloqueado: true },
  { titulo: "Maestro del tiempo", descripcion: "Usa el cronómetro 50 veces", icono: "⏰", desbloqueado: false },
];

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const UserScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Estadísticas</Text>
      <View style={styles.statsRow}>
        {estadisticas.map((item, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statIcon}>{item.icono}</Text>
            <Text style={styles.statValor}>{item.valor}</Text>
            <Text style={styles.statEtiqueta}>{item.etiqueta}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.titulo}>Logros</Text>
      {logros.map((logro, idx) => (
        <View key={idx} style={[styles.logroCard, !logro.desbloqueado && styles.logroBloqueado]}>
          <Text style={styles.logroIcon}>{logro.icono}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.logroTitulo}>{logro.titulo}</Text>
            <Text style={styles.logroDesc}>{logro.descripcion}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  statEtiqueta: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  logroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  logroBloqueado: {
    opacity: 0.5,
  },
  logroIcon: {
    fontSize: 26,
    marginRight: 16,
  },
  logroTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  logroDesc: {
    fontSize: 13,
    color: '#666',
  },
});

export default UserScreen;
