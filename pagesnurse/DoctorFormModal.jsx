import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Image } from 'react-native';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const doctorOptions = ['Jose ramiro', 'Vergamota Lopez', 'Patrick zorrano'];
const patientOptions = ['Jose Martinez', 'Vergamota culo', 'Patric perez'];

const DoctorFormModal = ({ closeModal }) => {
  const [state, setState] = useState({
    doctor: '',
    patient: ''
  });

  const finalSubmit = () => {
    if (state.doctor && state.patient) {
      console.log(state); // Mostrar datos del formulario en la consola
      toast.success('Form submitted successfully');
    } else {
      toast.error('Please fill up all input fields');
    }
  };

  const inputHandle = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ width: 250, height: 52, alignSelf: 'center', marginTop: -10, marginBottom: 10 }}
        source={require('./img/logonav.png')}
      />
      <ToastContainer />
      <View
        style={{
          width: 370,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#FFF',
          padding: 16
        }}
      >
        <View>
          <Text style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Asignar doctor a paciente</Text>
          <View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ marginTop: 0, fontSize: 16 }}>Paciente</Text>
              <Picker
                selectedValue={state.patient}
                onValueChange={(value) => inputHandle('patient', value)}
                style={{ borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 8, height: 25, marginBottom: 5 }}
              >
                {patientOptions.map((patient, index) => (
                  <Picker.Item key={index} label={patient} value={patient} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity onPress={finalSubmit} style={{ backgroundColor: '#39A969', borderRadius: 8, width: 80, alignSelf: 'center' }}>
              <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={closeModal} style={{ backgroundColor: '#FF0000', borderRadius: 8, width: 80, alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ color: '#FFF', padding: 8, textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorFormModal;
