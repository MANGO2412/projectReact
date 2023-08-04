import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import Boton from '../components/Boton';


function HomeScreen({navigation}) {
  const [patients, setPatients] = useState([]);

  // Función para obtener los datos de los pacientes desde la API utilizando Axios
  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://apifullheath.onrender.com/files/byHospital/0'); // Reemplaza 'https://tu-api.com/patients' con la URL de tu API
      setPatients(response.data);
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
    }
  };

  // Llama a fetchPatients al cargar el componente
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
   <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.titContainer}>
      <Text style={styles.tit}>Lista de pacientes</Text>
    </View>
    {patients.map((patient) => (
      <View key={patient._id} style={styles.tarjeta}>
        <View style={styles.nombre}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Patient's name: </Text>
          <Text style={{ fontSize: 15 }}>{patient.patient_details.name} {patient.patient_details.lastname}</Text>
        </View>
        <View style={styles.descrip}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Doctor asignado: </Text>
          {patient.doctor_details ? (
            <Text style={{ fontSize: 15 }}>{patient.doctor_details.Medical_info.name} {patient.doctor_details.Medical_info.lastname}</Text>
          ) : (
            <Text style={{ fontSize: 15 }}>No asignado</Text>
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
        style={{
          backgroundColor: '#39a969',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate('Receta');
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Ir a Receta
        </Text>
      </TouchableOpacity>
      
        </View>
      </View>
    ))}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
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

export default HomeScreen;
