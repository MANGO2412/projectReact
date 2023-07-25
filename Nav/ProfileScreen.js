import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../store/AuthContext';
import axios from 'axios';

function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  const [data, setData] = useState(null);
  
  const fetch = async () => {
    try {
      let id = await SecureStore.getItemAsync('user');
      const response = await axios.get('https://apifullheath.onrender.com/medicalUsrs/' + id); // Reemplaza 'https://tu-api.com/patients' con la URL de tu API
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
    }
  };

  useEffect(() => {
     fetch()
  }, []);


  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity> */}
     <View style={styles.profileContainer}>
      <Text style={styles.name}>{data[0]['Medical_info'].name} {data[0]["Medical_info"].lastname}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Especialty:</Text>
          <Text style={styles.infoValue}>{data[0]["Medical_info"].speciality}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{data[0].email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone Number:</Text>
          <Text style={styles.infoValue}>{data[0]["Medical_info"].phone}</Text>
        </View>
        <TouchableOpacity title="Sign out"  onPress={signOut}>
         </TouchableOpacity>
     </View>
     </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 18,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
  },
});

export default ProfileScreen;
