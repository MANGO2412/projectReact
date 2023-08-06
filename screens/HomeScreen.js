import React, { useEffect, useState,useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


function HomeScreen({navigation}) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Función para obtener los datos de los pacientes desde la API utilizando Axios
  const fetchPatients = async () => {
    try {

      setLoading(true)
      const response = await axios.get('https://apifullheath.onrender.com/files/byHospital/0/active'); // Reemplaza 'https://tu-api.com/patients' con la URL de tu API
      let files = response.data.map((element)=>element.patient)
      await SecureStore.setItemAsync('files',JSON.stringify(files))
      setPatients(response.data)

    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
      await SecureStore.setItemAsync('files',JSON.stringify([]))
      setPatients([])
    }
    setLoading(false)
  };

  //dar de alta los expedientes
  const lossFile=async (id)=>{
    try{
      let resp = await axios.post('https://apifullheath.onrender.com/files/disable/'+id);
      console.log(resp.data)
      Toast.show({
        type:'success',
        text1:'expediente dado de  alta',
        autoHide:true
      })
    }catch(error){console.log(error)}

    await fetchPatients();
  

  }



  // Llama a fetchPatients al cargar el componente
  //codigo para que habilite la actualizacion del los datos de forma automatica
  useFocusEffect(
    useCallback(() => {
       fetchPatients()
      
      // Do something when the screen is focused
      return () => {};
    }, [])
  );

 

  return (
    
    
    <ScrollView >
   
     <View style={styles.titContainer}>
         <Text style={styles.tit}>Lista de pacientes</Text>
     </View>
     {
      loading?(
       <View>
           {/* loader icon */}
       </View>
      ):(
         <>
             {
          patients.map((patient)=>(
            <View key={patient['_id']}  style={styles.tarjeta}>
               <View style={styles.nombre}>
                 <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Patient's name: </Text>
                 <Text style={{ fontSize: 15 }}>{patient.patient_details.name} {patient.patient_details.lastname}</Text>
               </View>
                <View style={styles.descrip}>
                   <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Doctor's assigned: </Text>
                   {patient.doctor_details ? (
                     <Text style={{ fontSize: 15 }}>{patient.doctor_details.Medical_info.name} {patient.doctor_details.Medical_info.lastname}</Text>
                   ) : (
                     <Text style={{ fontSize: 15 }}>No asignado</Text>
                   )}
               </View>
                <View style={{alignItems:'center'}}>
                       <TouchableOpacity style={{backgroundColor: '#39a969',padding: 10,borderRadius: 8,marginTop: 20,}}
                         onPress={() => {navigation.navigate('Receta');}}>
                               <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                 Ir a Receta
                               </Text>
                       </TouchableOpacity>
                       <TouchableOpacity
                         style={{backgroundColor: '#39a969',padding: 10,borderRadius: 8,marginTop: 20}} onPress={()=>{lossFile(patient['_id'])}}
                       >
                         <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                           Dar de Alta
                         </Text>
                       </TouchableOpacity>
                </View>
            </View>
          ))
          }
        </>
      )
     }

    
  </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: 'white'
  },
  titContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  tarjeta: {
    width: 500,
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
    marginTop: 10
  },
  botonTexto: {
    color: '#39a969',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
