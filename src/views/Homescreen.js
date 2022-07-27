import React from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {firebase} from '../config';
import {Fontawesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';





function Homescreen() {

    const [todos, setTodos] = useState([]);


  return (
    <div>Homescreen</div>
  )
}

export default Homescreen