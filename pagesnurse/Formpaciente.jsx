import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState,useEffect } from 'react';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native';
import { json } from 'react-router-dom';

const FormPaciente = () => {
  const formArray = [1, 2,3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    name:'',
    lastname:'',
    age:'',
    phone:'',
    emergencyPhone:'',
    height:'',
    typeBlood:'',
    hospital: 0,
    DoB:'',
    weight:'',

  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    inputHandle('DoB', date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const handleNextAndSubmit = () => {
    if (
      state.name &&
      state.lastname &&
      state.age &&
      state.phone &&
      state.emergencyPhone &&
      state.DoB &&
      state.weight &&
      state.height &&
      state.typeBlood 
    ) {
      // Llamar a la función para enviar los datos
      sendFormData();
      console.log(formData);

      // Llamar a la función para avanzar al siguiente formulario
      if (formNo === 1 && state.name && state.lastname && state.age && state.phone && state.emergencyPhone && state.DoB) {
        if (state.phone.length === 10) {
          setFormNo(formNo + 1);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Por favor ingresa un número de teléfono válido',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      } else if (formNo === 2 && state.weight && state.height && state.typeBlood) {
        setFormNo(formNo + 1);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Por favor completa todos los campos',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Por favor completa todos los campos',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

const hospital = 0; // Reemplaza esto con el valor correcto del hospital

const [formData, setFormData] = useState({});

useEffect(()=>{
  setFormData((prevFormData) => ({
    ...prevFormData,
     hospital
  }));
},[])

// Función para enviar los datos del formulario a la API
const sendFormData = async () => {
  try {
    const response = await fetch('https://apifullheath.onrender.com/patients/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const patient = data.id; // Obtenemos el ID del paciente desde la respuesta de la API
      setPatient(patient); // Guardamos el ID del paciente en el estado
      console.log('ID del paciente registrado:', patient);
      Toast.show({
        type: 'success',
        text1: 'Formulario enviado exitosamente',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      console.log('Error al enviar el formulario');
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al enviar el formulario',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    Toast.show({
      type: 'error',
      text1: 'Hubo un error al enviar el formulario',
      visibilityTime: 2000,
      autoHide: true,
    });
  }
};



// Función para manejar los cambios en los campos del formulario
const inputHandle = (name, value) => {
  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
  
};
  ///////////////////////////////////// Esto es para dar delante y pa atras al formulario /////////////////////////////////////
  const next = () => {
    if (formNo === 1 && state.name && state.lastname && state.age && state.phone && state.emergencyPhone && state.DoB) {
      if (state.phone.length === 10) {
        setFormNo(formNo + 1);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Por favor ingresa un número de teléfono válido',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else if (formNo === 2 && state.weight && state.height && state.typeBlood) {
      setFormNo(formNo + 1);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Por favor completa todos los campos',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };
  
  const pre = () => {
    if (formNo > 1) {
      setFormNo(formNo - 1);
    } else {
      Toast.show({
        type: 'error',
        text1: 'No hay formularios anteriores',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };
///////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////
const [patient, setPatient] = useState(null);
const finalSubmit = () => {
    console.log(selectedDeviceId)
    console.log(patient)
    console.log(selectedDoctorId)

  // if (
  //   patient && selectedDeviceId && selectedDoctorId
  // ) {
  //   // Llamar a la función para enviar los datos
  //   sendFormData1();
  //   console.log(formData1);
  // } 
};

////esto puede que se elimine xd es de pruebaf
const [formData1, setFormData1] = useState({});
////esteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

const sendFormData1 = async () => {
  try {
     console.log(formData1)

    const response = await axios.post('https://apifullheath.onrender.com/files/assign', {hospital,patient:patient,device:selectedDeviceId,doctor:selectedDoctorId});
      console.log(response.data)
    if (response.data) {
      console.log(formData1)
      Toast.show({
        type: 'success',
        text1: 'Formulario enviado exitosamente',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      console.log(response.json())
      console.log('Error al enviar el formulario');
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al enviar el formulario',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    Toast.show({
      type: 'error',
      text1: 'Hubo un error al enviar el formulario',
      visibilityTime: 2000,
      autoHide: true,
    });
  }
};

//////////////////////////////////////////////  Formulario de picker para agregar a los doctores  /////////////////////////////////////
  const [doctors, setDoctors] = useState(['valuee']); // Estado para almacenar la lista de doctores
  const [selectedDoctorId, setSelectedDoctorId] = useState("valor no cambiado"); // Estado para almacenar el ID del doctor seleccionado

  useEffect(() => {
    // Función para obtener la lista de doctores desde la API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://apifullheath.onrender.com/medicalUsrs/byHospital/0/typeUser/Doctor'); // Reemplaza 'URL_DE_TU_API_DOCTORES' con la URL correcta de tu API
        setDoctors(response.data); // Almacenar la lista de doctores en el estado
      } catch (error) {
        console.error('Error al obtener la lista de doctores:', error);
      }
    };

    fetchDoctors(); // Llamar a la función para obtener la lista de doctores al cargar el componente
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////

//////////////////////////////////////////////  Formulario de picker para agregar a los dispositivos  /////////////////////////////////////
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // Reemplaza 'URL_DE_TU_API_DISPOSITIVOS' con la URL correcta de tu API que devuelve la lista de dispositivos
        const response = await axios.get('https://apifullheath.onrender.com/devices/byHospital/0/active');
        const filteredDevices = response.data.filter((device) => device.status === true);
        setDevices(filteredDevices);
      } catch (error) {
        console.error('Error al obtener la lista de dispositivos:', error);
      }
    };

    fetchDevices();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////
  
///////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Toast/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ width: 250, height: 52, alignSelf: 'center', marginBottom: 40 }}
        source={require('../img/logonav.png')}
      />

      <View
        style={{
          width: 370,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#FFF',
          padding: 16,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {formArray.map((v, i) => (
            <React.Fragment key={i}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  backgroundColor:
                    formNo - 1 === i || formNo === i + 1 || formNo === formArray.length ? '#39A969' : '#CBD5E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 3,
                }}
              >
                <Text style={{ color: '#FFF' }}>{v}</Text>
              </View>
              {i !== formArray.length - 1 && (
                <View
                  style={{
                    width: 85,
                    height: 2,
                    backgroundColor: formNo === i + 2 || formNo === formArray.length ? '#39A969' : '#CBD5E0',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {formNo === 1 && (
          <View>
            <Text style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Datos del paciente</Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 12, fontSize: 16 }}>Nombre del Paciente</Text>
              <TextInput
                value={state.name}
                onChangeText={(value) => inputHandle('name', value)}
                style={{
                  borderWidth: 1,
                  borderColor: '#CBD5E0',
                  paddingVertical: 8,
                  borderRadius: 4,
                  marginBottom: 4,
                  marginTop: 0,
                }}
                placeholder="Nombre"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Apellidos del paciente</Text>
              <TextInput
                value={state.lastname}
                onChangeText={(value) => inputHandle('lastname', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Apellidos"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Edad del paciente</Text>
              <TextInput
                value={state.age}
                onChangeText={(value) => inputHandle('age',Number(value))}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="age"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Numero de celular</Text>
              <TextInput
                value={state.phone}
                onChangeText={(value) => inputHandle('phone', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Cellphone Number"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Numero de celular de emergencia</Text>
              <TextInput
                value={state.emergencyPhone}
                onChangeText={(value) => inputHandle('emergencyPhone', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="EmergencyPhone"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
  <Text style={{ marginTop: 5, fontSize: 16 }}>Fecha de ingreso</Text>
  <View style={{ marginBottom: 8 }}>
      <Text style={{ marginTop: 5, fontSize: 16 }}>Fecha de ingreso</Text>
      <TouchableOpacity onPress={showDatePicker} style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4, marginBottom: 10 }}>
          <Text>{state.DoB || 'Seleccionar fecha'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
</View>

            <TouchableOpacity onPress={next} style={{ backgroundColor: '#39A969', borderRadius: 4, width: 70, alignSelf: 'center' }}>
              <Text style={{ color: '#FFF', padding: 8, textAlign: 'center', fontSize: 16 }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}

        {formNo === 2 && (
          <View>
            <Text style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Registro del paciente</Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 12, fontSize: 16 }}>Peso del paciente</Text>
              <TextInput
                value={state.weight}
                onChangeText={(value) => inputHandle('weight',Number(value))}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Peso (kg)"
                keyboardType="numeric"
              />
            </View>
            
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>height</Text>
               <TextInput
                value={state.height}
                onChangeText={(value) => inputHandle('height',Number(value))}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="Height(foot)"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>TypeBlood</Text>
              <TextInput
                value={state.typeBlood}
                onChangeText={(value) => inputHandle('typeBlood', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', paddingVertical: 8, borderRadius: 4 }}
                placeholder="typeBlood"
              />
            </View>

            <TouchableOpacity onPress={pre} style={{ backgroundColor: '#39A969', borderRadius: 4, textAlign: 'center', fontSize: 16 }}>
              <Text style={{ color: '#FFF', padding: 8 }}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextAndSubmit} style={{ backgroundColor: '#39A969', borderRadius: 4, width: 80, alignSelf: 'center' }}>
              <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}
        {formNo === 3 && (
        <View>
            <Text style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Asignar medico y dipositivo</Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Doctor</Text>
              <Picker selectedValue={selectedDoctorId} onValueChange={(itemValue) => setSelectedDoctorId(itemValue)}>
              <Picker.Item label="Seleccionar Doctor" value={null} />
        {doctors.map((doctor) => (
          <Picker.Item key={doctor._id} label={doctor.Medical_info.name} value={doctor._id} />
        ))}
      </Picker>

      {/* Mostrar el ID del doctor seleccionado (esto es solo para verificar durante el desarrollo) */}
      <Text>ID del doctor seleccionado: {selectedDoctorId}</Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 5, fontSize: 16 }}>Device</Text>
              <Picker selectedValue={selectedDeviceId} onValueChange={(itemValue) => setSelectedDeviceId(itemValue)}>
        <Picker.Item label="Seleccionar Dispositivo" value={null} />
        {devices.map((device) => (
          <Picker.Item key={device._id} label={device.name} value={device._id} />))}
      </Picker>

      <Text>ID del dispositivo seleccionado: {selectedDeviceId}</Text>

            </View>
            <TouchableOpacity onPress={sendFormData1} style={{ backgroundColor: '#39A969', borderRadius: 4, width: 80, alignSelf: 'center' }}>
              <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Asignar Doctor</Text>
            </TouchableOpacity>
  </View>
)}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#fff'
  },
})

export default FormPaciente;
