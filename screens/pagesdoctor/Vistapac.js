import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'; // Import Dimensions
import { useFocusEffect } from '@react-navigation/native';
import LiveChart from '../../components/livechart';
import axios from 'axios';


import * as SecureStore from 'expo-secure-store';

const Vistapac = () => {
  const [file, setFile] = useState([]);
  const [isLog, setLog] = useState(false);

  const getFile = async () => {
    try {
      let id = await SecureStore.getItemAsync('fileID');
      let resp = await axios.get('https://apifullheath.onrender.com/files/' + id);
      setFile(resp.data);
    } catch (error) {
      console.log(error);
      setFile([]);
    }
    setLog(false);
  };

  useFocusEffect(
    useCallback(() => {
      getFile();
      return () => {};
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {file[0] && (
        <View
          key={file.id}
          style={{
            flex: 1,
            justifyContent: 'flex-start', // Align content at the top
            alignItems: 'center', // Center horizontally
            width: Dimensions.get('window').width * 0.9, // Set width to 90% of the screen width
            alignSelf: 'center', // Center the container horizontally
          }}
        >
          <Image
            style={{ width: 250, height: 52, alignSelf: 'center', marginTop: 15, marginBottom: 10 }}
            source={require('../../img/logonav.png')}
          />
          {isLog ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View>
                 
              {file[0] ? (
                <View>
                  <Text style={{ marginTop: 12, marginBottom: 20, fontSize: 22, alignSelf: 'center', marginLeft:-10 }}>
                    Estado del paciente
                  </Text>
                  <View
                    style={{
                      marginBottom: 14,
                      display: 'flex',
                      flexDirection: 'row',
                      backgroundColor: '#39a969',
                      width: '160%',
                      marginLeft: -65,
                      height: 32,
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 110,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 5,
                        color: '#fff',
                      }}
                    >
                      Datos del paciente
                    </Text>
                  </View>
                  <View>
                    <View style={{ marginBottom: 8, display: 'flex', flexDirection: 'row', marginLeft: -55  }}>
                      <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                        Nombre del paciente:
                      </Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}>
                        {' ' + file[0]['patient_details'].name + ' ' + file[0]['patient_details'].lastname}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 14, display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold', marginLeft: -55 }}>Edad:</Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}> {file[0]['patient_details'].age} </Text>
                      <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}> Peso:</Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}> {file[0]['patient_details'].weight} KG </Text>
                    </View>
                    <View
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#39a969',
                        height: 33,
                        width: '160%',
                      marginLeft: -65,
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 7,
                          marginLeft: 100,
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginBottom: 5,
                          color: '#fff',

                        }}
                      >
                        Diagnostico y tratamiento
                      </Text>
                    </View>
                    <View>
                    <View style={{ marginBottom: 8, display: 'flex', marginLeft: -55  }}>
                      <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                        Diagnostico:
                      </Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}>
                        {file[0].diagnostic}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 14, flexDirection: 'row' }}>
                         <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}> Sintomas:</Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}> {file[0]['treatment'].symptoms}</Text>
                      <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold', marginLeft: -55 }}>Medicamentos a dar:</Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}> {file[0]['treatment'].dosis} </Text>
                      <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}> Administracion del medicamento:</Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}> {file[0]['treatment'].Administration}</Text>
                         <Text style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}> Descripcion del paciente:</Text>
                      <Text style={{ marginTop: 0, fontSize: 16 }}> {file[0]['treatment'].Description}</Text>
                    </View>
                    </View>
                    <View
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#39a969',
                        height: 33,
                        width: '160%',
                      marginLeft: -65,
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 7,
                          marginLeft: 150,
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginBottom: 5,
                          color: '#fff',

                        }}
                      >
                        Valores
                      </Text>
                    </View>
                    {/* grafica de frecuencia  */}
                    <View>
                    <LiveChart 
                         params={{
                           device:1,
                           file:20,
                           kd:'Toc'
                         }}

                         info={{
                          name:"temperatura",
                          max:40,
                          min:34
                         }}
                        />
                    </View>
                    
                    {/* grafica de temperatura  */}
                    <View>
                        
                    </View>
                  </View>
                </View>
             
              ) : (
                <>
                  <Text>...loading</Text>
                </>
              )}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Vistapac;
