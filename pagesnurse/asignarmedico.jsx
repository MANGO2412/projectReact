import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import DoctorFormModal from './DoctorFormModal';

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titContainer}>
        <Text style={styles.tit}>Lista de doctores</Text>
      </View>
      <View style={styles.tarjeta}>
        <View style={styles.nombre}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Doctor's name: </Text>
          <Text style={{ fontSize: 15 }}>Gael Breton</Text>
        </View>
        <View style={styles.descrip}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Especialidad: </Text>
          <Text style={{ fontSize: 15 }}>Psicologia para la gente pendeja</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.boton} onPress={openModal}>
            <Text style={styles.botonTexto}>Asignar paciente</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.boton} onPress={() => console.log('Hola')}>
            <Text style={styles.botonTexto}>Ver perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
        <DoctorFormModal closeModal={closeModal} />
      </Modal>
    </ScrollView>
  );
}

