import React,{useState,useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard,Pressable} from 'react-native';
import {firebase} from '../config';
import {Fontawesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons';
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';










function Homescreen() {

    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useSate('');
    const navigation = useNavigation();

    // fetch or read the data from the firestore

    useEffect(() => {
      todoRef
      .orderBy('createdAt','desc')
      .onSnapshot(
        querySnapshot => {
          const todos = []
          querySnapshot.forEach((doc)=>{
            const {heading} = doc.data()
            todos.push({
              id:doc.id,
              heading,
            })
          })
          setTodos(todos)
        }
      )
    }, [])


    // delete a todo from firestore db

    const deleteTodo =  (todos) => {
      todoRef
          .doc(todos.id)
          .delete()
          .then(()=>{
            // show a successful alert
            alert('Deleted Successfully')
          })
          .cath(error => {
            alert(error);
          })
    }

    // add a todo from 

    const addTodo = () => {
      // check if we have a todo
        if(addData && addData.length > 0){
          // get the time stamp
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const data = {
            heading: addData,
            createdAt:timestamp
          };
          todoRef
            .add(data)
            .then(()={
              setAddData('');
              // releas keyboard
              Keyboard.dismiss();
            })
            .catch((error) => {
              alert(error);
            })
        }
    }


  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
          <TextInput
          style = {styles.input}
          placeholder = 'Add A New Todo'
          placeholderTextColor = '#aaaaaa'
          onChangeText = {(heading) => setAddData(heading)}
          value = {addData}
          underlineColorAndroid = 'transparent'
          autoCapitalize='none'
          />
          <TouchableOpacity style = {styles.button} onPress={addTodo} >
              <Text style={styles.button.buttonText}></Text>

          </TouchableOpacity>

          <View>
          <FlatList
            data = {todos}
            numColumns={1}
            renderItem={({item}) => (
              <View>
                  <Pressable
                    style = {{styles.container}}
                    onPress ={() => navigation.navigate('Detail',{item})}
                  >

                    <FontAwesome/>

                  </Pressable>
              </View>
            ) }
          />
          </View>


      </View>
    </View>
  )
}

export default Homescreen
