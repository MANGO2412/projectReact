import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';


const Infopac = () => {
    // Datos de muestra del paciente
    const paciente = {
      nombre: 'Juan Pérez',
      peso: '70 kg',
      edad: 30,
      enfermedad: 'Hipertensión',
      // Otras propiedades del paciente...
    };
  
    // Datos de muestra para las gráficas (puedes cambiarlos según tus necesidades)
    const dataGrafica1 = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
    };
  
    const dataGrafica2 = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{ data: [15, 22, 12, 32, 40, 27, 18] }],
    };
  
    // Estilos para las gráficas
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.nombre}>{paciente.nombre}</Text>
          <Text style={styles.detalle}>Peso: {paciente.peso}</Text>
          <Text style={styles.detalle}>Edad: {paciente.edad} años</Text>
        </View>
  
        <View style={styles.graficasContainer}>
          <LineChart
            data={dataGrafica1}
            width={300}
            height={150}
            chartConfig={chartConfig}
          />
  
          <BarChart
            data={dataGrafica2}
            width={300}
            height={150}
            chartConfig={chartConfig}
          />
        </View>
  
        <View style={styles.otraInfoContainer}>
          <Text style={styles.otraInfo}>Enfermedad: {paciente.enfermedad}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    infoContainer: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    nombre: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    detalle: {
      fontSize: 16,
    },
    graficasContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    otraInfoContainer: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 10,
    },
    otraInfo: {
      fontSize: 16,
    },
  });
  
  export default Infopac;
  