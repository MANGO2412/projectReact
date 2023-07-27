import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import AuthContext from '../store/AuthContext';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your tab components here
import HomeScreen from '../Nav/HomeScreen';
import NotificationsScreen from '../Nav/NotificationsScreen';
import ProfileScreen from '../Nav/ProfileScreen';
import SplashScreen  from '../screens/SplashScreen'
import Login from '../screens/Login';

const Tab = createMaterialBottomTabNavigator();

const showAlert = () => {
  Alert.alert(
    'Error al iniciar sesion',
    'Verifica si tu correo o contraseña son correctas'
  );
};

const AppTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#39a969"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Create patient',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Doctor's List"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Doctors List',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AppTabsNavigatordoc = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#39a969"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Create patient',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Crear Receta"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Crear receta',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createNativeStackNavigator();

const NavContener = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('user');
      } catch (e) {
        userToken = null;
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let resp = await fetch('https://apifullheath.onrender.com/medicalUsrs/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        let mess = await resp.json();

        console.log(mess);
        if (mess[0] != null) {
          await SecureStore.setItemAsync('user', String(mess[0]['_id']));
        } else {
          showAlert();
        }

        dispatch({ type: 'SIGN_IN', token: mess[0] ? ['_id'] : null });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('user');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  // return (
  //   <AuthContext.Provider value={authContext}>
  //     <NavigationContainer>
  //       <Stack.Navigator
  //       initialRouteName="Home"
  //     activeColor="#39a969"
  //     barStyle={{ backgroundColor: 'white' }}>
  //         {state.isLoading ? (
  //           <Stack.Screen name="Splash" component={SplashScreen} />
  //         ) : state.userToken == null ? (
  //           <Stack.Screen
  //             name="SignIn"
  //             component={Login}
  //             options={{
  //               title: 'Sign in',
  //               animationTypeForReplace: state.isSignout ? 'pop' : 'push',
  //             }}
  //           />
  //         ) : (
  //           // Instead of rendering HomeScreen, use AppTabsNavigator here
  //            <Stack.Screen name="Home"
  //       options={{
  //         tabBarLabel: 'home',
  //         tabBarIcon: ({ color }) => (
  //           <MaterialCommunityIcons name="home" color={color} size={14} />
  //         ),
  //       }}>
  //             {props => <AppTabsNavigator {...props} />}
  //           </Stack.Screen>,
  //           <Stack.Screen name="N"
  //       options={{
  //         tabBarLabel: 'home',
  //         tabBarIcon: ({ color }) => (
  //           <MaterialCommunityIcons name="home" color={color} size={14} />
  //         ),
  //       }}>
  //             {props => <AppTabsNavigator {...props} />}
  //           </Stack.Screen> 

  //         )}
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </AuthContext.Provider>
  // );


   return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
        
          {/* <Stack.Navigator
          initialRouteName="Home"
        activeColor="#39a969"
        barStyle={{ backgroundColor: 'white' }}> */}
            {state.isLoading ? (
                <Stack.Navigator>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                </Stack.Navigator>
            ) : state.userToken == null ? (
              
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={Login}
                options={{
                  title: 'Sign in',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </Stack.Navigator>
            ) : (
                <AppTabsNavigator/>
            )
            }
        </NavigationContainer>
      </AuthContext.Provider>
   )
};

export default NavContener;
