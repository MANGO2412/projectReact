import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
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
          style={styles.cardContainer}
        >
          <Image
            style={styles.logo}
            source={require('../../img/logonav.png')}
          />
    
          {isLog ? (
            <View style={styles.loadingContainer}>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>
                    Estado del paciente
                  </Text>
            <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Graficas de temperatura</Text>
                  </View>
               
                 
              {file[0] ? (
                <View>
                   <View>
                    <LiveChart
                      params={{
                        device: file[0].device,
                        file: file[0].file,
                        kd: 'Toc'
                      }}
                      info={{
                        name: "temperatura",
                        max: 40,
                        min: 34
                      }}
                    />
                  </View>
                  

                  <View>
                    <LiveChart
                      params={{
                        device:  file[0].device,
                        file: file[0].file,
                        kd: 'FC'
                      }}
                      info={{
                        name: "Frecuencia cardiaca",
                        max: 100,
                        min: 40
                      }}
                    />
                </View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText2}>Datos personales</Text>
                  </View>
                  <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Nombre del paciente:</Text>
                    <Text style={styles.infoValue}>
                    {file[0]['patient_details'].name + ' ' + file[0]['patient_details'].lastname}
                    </Text>
                    <Text style={styles.infoLabel}>Edad:</Text>
                    <Text style={styles.infoValue}>{file[0]['patient_details'].age + ' años'}</Text>
                    <Text style={styles.infoLabel}>Peso:</Text>
                    <Text style={styles.infoValue}>{file[0]['patient_details'].weight} KG</Text>
                  </View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText3}>Diagnóstico y tratamiento</Text>
                  </View>
                  <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Diagnóstico:</Text>

                    {file[0]['treatment'].diagnostic? (
                      <Text style={styles.infoValue}>{file[0]['treatment'].diagnostic}</Text>
                   ) : (
                     <Text style={{ fontSize: 15 }}>No asignado aun</Text>
                   )}

                   <Text style={styles.infoLabel}>Síntomas:</Text>
                   {file[0]['treatment'].symptoms? (
                      <Text style={styles.infoValue}>{file[0]['treatment'].symptoms}</Text>
                      
                   ) : (
                     <Text style={{ fontSize: 15 }}>No asignado aun</Text>
                   )}

                    <Text style={styles.infoLabel}>Medicamentos a dar:</Text>
                    {file[0]['treatment'].medication? (
                      <Text style={styles.infoValue}>{file[0]['treatment'].medication}</Text>
                      
                   ) : (
                     <Text style={{ fontSize: 15 }}>No asignado aun</Text>
                   )}

                    <Text style={styles.infoLabel}>Administración del medicamento:</Text>
                    {file[0]['treatment'].Administration? (
                      <Text style={styles.infoValue}>{file[0]['treatment'].Administration}</Text>
                      
                   ) : (
                     <Text style={{ fontSize: 15 }}>No asignado aun</Text>
                   )}
                    <Text style={styles.infoLabel}>Descripción del paciente:</Text>
                    {file[0]['treatment'].Description? (
                      <Text style={styles.infoValue}>{file[0]['treatment'].Description}</Text>
                      
                   ) : (
                     <Text style={{ fontSize: 15 }}>No asignado aun</Text>
                   )}
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
    flexGrow: 1, // Permite que el ScrollView crezca en altura
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  logo: {
    width: 250,
    height: 52,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  loadingContainer: {
    // Styles for loading container
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 20,
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: -10,
  },
  sectionHeader: {
    marginBottom: 14,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#39a969',
    width: '160%',
    marginLeft: -65,
    height: 32,
  },
  sectionHeaderText: {
    marginTop: 7,
    marginLeft: 155,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  sectionHeaderText2: {
    marginTop: 7,
    marginLeft: 183,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  sectionHeaderText3: {
    marginTop: 7,
    marginLeft: 150,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  infoSection: {
    marginBottom: 14,
    marginLeft: -10,
    marginRight: -10,
  },
  infoLabel: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoValue: {
    marginTop: 0,
    fontSize: 16,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default Vistapac;
