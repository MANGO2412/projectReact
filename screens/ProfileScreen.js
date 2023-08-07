import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AuthContext from '../store/AuthContext';

function ProfileScreen() {
  const [data, setData] = useState(null);
  const {signOut}= useContext(AuthContext)
  const fetch = async () => {
    try {
      let id = await SecureStore.getItemAsync('user');
      const response = await axios.get('https://apifullheath.onrender.com/medicalUsrs/' + id ); // Reemplaza 'https://tu-api.com/patients' con la URL de tu API
      setData(response.data);
        } catch (error) {
      console.error('Error al cargar perfil:', error);
    }
  };

  useEffect(() => {
     fetch()
  }, []);

  if (!data) {
    // Data is not available yet, display a loading message or spinner
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
      <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity> */}
     <View style={styles.profileContainer}>
     <Image source={require('../img/zi.jpg')} style={styles.profileImage} />
      <Text style={styles.name}>{data[0]?data[0]['Medical_info'].name:"prieba"} {data[0]?data[0]["Medical_info"].lastname:"jajjaja"}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}></View>
          <Text style={styles.infoLabel}>Especialty:</Text>
          <Text style={styles.infoValue}>{data[0]?data[0]["Medical_info"].speciality:"kkaka"}</Text>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{data[0]?data[0].email:"jajaja"}</Text>
          <Text style={styles.infoLabel}>Phone Number:</Text>
          <Text style={styles.infoValue}>{data[0]?data[0]["Medical_info"].phone:"jajaj"}</Text>
        </View>
        {/* <TouchableOpacity title="Sign out"/> */}
        <Button style={{marginTop:20}} title="logout" onPress={()=>signOut()}/>

     </View>
  );

}

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
    marginBottom: 30
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
