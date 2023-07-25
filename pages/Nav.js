import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from "./pages/Home.jsx"

const Menu = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={require('./img/logonav.png')} style={styles.logo} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Menu.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Menu.Screen name="Inicio" component={Home} />
      </Menu.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 20,
    marginRight: -20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});