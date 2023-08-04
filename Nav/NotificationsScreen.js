import {React, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';


function NotificationsScreen() {
  const [doctor, setDoctors] = useState([]);

  // Función para obtener los datos de los pacientes desde la API utilizando Axios
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://apifullheath.onrender.com/medicalUsrs/byHospital/0/typeUser/Doctor'); // Reemplaza 'https://tu-api.com/patients' con la URL de tu API
      setDoctors(response.data);
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titContainer}>
        <Text style={styles.tit}>Lista de doctores</Text>
      </View>
      {doctor.map((doctor) => (
      <View key={doctor._id} style={styles.tarjeta}>
        <View style={styles.nombre}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Doctor's name: </Text>
          <Text style={{ fontSize: 15 }}>{doctor.Medical_info.name} {doctor.Medical_info.lastname}</Text>
        </View>
        <View style={styles.descrip}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Especialidad: </Text>
          <Text style={{ fontSize: 15 }}>{doctor.Medical_info.speciality}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.boton} onPress={() => console.log('Hola')}>
          <Text style={styles.botonTexto}>Ver perfil</Text>
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

export default NotificationsScreen;
