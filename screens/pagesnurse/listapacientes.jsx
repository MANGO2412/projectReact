import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titContainer}>
        <Text style={styles.tit}>Lista de pacientes</Text>
      </View>
      <View style={styles.tarjeta}>
        <View style={styles.nombre}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Patient's name: </Text>
          <Text style={{ fontSize: 15 }}>Gael Breton</Text>
        </View>
        <View style={styles.descrip}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Diagnostico: </Text>
          <Text style={{ fontSize: 15 }}>Anorexia y herpes</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.boton} onPress={() => console.log('Hola')}>
          <Text style={styles.botonTexto}>Ver paciente</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
