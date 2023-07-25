import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export function Listapac() {
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  titContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  tarjeta: {
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: '#d9d9d9d9'
  },
  tit: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nombre: {
    display: 'flex',
    flexDirection: 'row', // Corregir "Row" a "row"
    fontSize: 30
  },
  descrip: {},
  boton: {
    backgroundColor: '#fff',
    width: '60%',
    borderWidth: 2,
    borderColor: '#39a969',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#39a969',
    fontWeight: 'bold',
  },
});
