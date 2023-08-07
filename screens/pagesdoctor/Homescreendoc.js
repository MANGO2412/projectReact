import {React, useEffect, useState,useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

function HomeScreendoc({navigation}) {
  const [data, setData] = useState(null);

  const fetch = async () => {
    try {
      let id = await SecureStore.getItemAsync('user');
      const response = await axios.get('https://apifullheath.onrender.com/files/assigned/' + id); // Reemplaza 'https://tu-api.com/patients' con la URL de tu API
      setData(response.data);
        } catch (error) {
           console.error('Error al cargar los pacientes:', error);
         }
  };

   //method to change value
   const changeView =async (id)=>{
       await SecureStore.setItemAsync('fileID',String(id))
       navigation.navigate('Receta')
   }
   const changeViewdoc =async (id)=>{
    await SecureStore.setItemAsync('fileID',String(id))
    navigation.navigate('Vistapac')
}
  


useFocusEffect(
  useCallback(()=>{
      fetch()
  },[])
)






 if (!data) {
  // Data is not available yet, display a loading message or spinner
  return (
    <View style={styles.container}>
      <Text>Aun no tiene pacientes asignados</Text>
    </View>
  );
}
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titContainer}>
        <Text style={styles.tit}>Lista de pacientes asignados</Text>
      </View>
      {
        data.map((file)=>{
            return( <View style={styles.tarjeta}>
              <View style={styles.nombre}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Patient's name: </Text>
                <Text style={{ fontSize: 15 }}>{file['patient_details'].name} {data[0]?data[0]["patient_details"].lastname:"zi"}</Text>
              </View>
              <View style={styles.descrip}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Diagnostico: </Text>
                {
                  file.diagnostic ? ( <Text style={{ fontSize: 15 }}>{file['treatment'].diagnostic}</Text>)
                :( <Text style={{ fontSize: 15 }}>No asignado</Text>)
                }
              </View>
              <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{backgroundColor: '#39a969',padding: 10,borderRadius: 8,marginTop: 20,}}
                onPress={() => {changeView(file['_id'])}}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Asignar Receta
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={{backgroundColor: '#39a969',padding: 10,borderRadius: 8,marginTop: 20,}}
                onPress={() => {changeViewdoc(file['_id'])}}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Ver paciente
                </Text>
              </TouchableOpacity>
              </View>
            </View>)
        })
      }
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
export default HomeScreendoc;