



import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SignInScreen from './src/signin';
import SignUpScreen from './src/views/SignUpScreen';
import SignIn from './src/views/SignInScreen';
import Detail  from './src/views/Detail';
import Homepage from './src/views/Homescreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// import BoardScreen from './src/components/BoardScreen';
// import BoardDetailScreen from './components/BoardDetailScreen';
// import AddBoardScreen from './components/AddBoardScreen';
// import EditBoardScreen from './components/EditBoardScreen';

const Stack = createStackNavigator();

export default function App() {

  

  return (

    <NavigationContainer>

      <Stack.Navigator>
        {/* <Stack.Screen name= "SignUp" component={SignUpScreen}/> */}
        {/* <Stack.Screen name= "SignIn" component={SignIn}/> */}
        <Stack.Screen name= "Homepage" component={Homepage}/>
        <Stack.Screen name= "Detail" component={Detail}/>
        {/* <Stack.Screen name= "SignUp" component={SignUpScreen}/>
        <Stack.Screen name= "SignUp" component={SignUpScreen}/> */}
      </Stack.Navigator>

    </NavigationContainer>

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
