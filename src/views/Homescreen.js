import React,{useState,useEffect} from 'react';
<<<<<<< HEAD
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable} from 'react-native';
=======
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard,Pressable} from 'react-native';
>>>>>>> 897cb9997940cee072ee3bf4447edde0858d77ba
import {firebase} from '../config';
import {Fontawesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons';
<<<<<<< HEAD
=======
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';





>>>>>>> 897cb9997940cee072ee3bf4447edde0858d77ba











const Homescreen = () => {

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
<<<<<<< HEAD
             .add(data)
              .then(() = {
                  setAddData('');
                  // release keyboard
                  Keyboard.dismiss();
=======
            .add(data)
            .then(()={
              setAddData('');
              // releas keyboard
              Keyboard.dismiss();
>>>>>>> 897cb9997940cee072ee3bf4447edde0858d77ba
            })
            .catch((error) => {
              alert(error);
            })
        }
    }


  return (
    <View style={{flex:1}}>
<<<<<<< HEAD
      <View style={styles.formContainer}>
=======
      <View style={styles.container}>
>>>>>>> 897cb9997940cee072ee3bf4447edde0858d77ba
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
<<<<<<< HEAD
                    style = {styles.container}
                    onPress ={() => navigation.navigate('Detail',{item})}
                  >

                    <FontAwesome
                        name = 'trash-o'
                        color = 'red'
                        onPress={() => deleteTodo(item)}
                        style = {styels.todoIcon}
                        />
                      <View style={styles.innerContainer} >
                        <Text style ={styles.itemHeading}>
                          {item.heading[0].toUpperCase() + item.heading.slice(1)}

                        </Text>
                      </View>
=======
                    style = {{styles.container}}
                    onPress ={() => navigation.navigate('Detail',{item})}
                  >

                    <FontAwesome/>
>>>>>>> 897cb9997940cee072ee3bf4447edde0858d77ba

                  </Pressable>
              </View>
            ) }
          />
          </View>


      </View>
    </View>
  )
}

<<<<<<< HEAD
export default Homescreen;


const styles = StyleSheet.create({

  container:{
    backgroundColor:'#e5e5e5',
    padding:15,
    borderRadius:15,
    margin:5,
    marginHorizontal:10,
    flexDirection:'row',
    alignItems:'center'
  },
  innerContainer:{
    alignItems:'center',
    flexDirecation:'column',
    marginLeft:22, 
  },
  itemHeading:{
    fontWeight:'bold',
    fontSize:18,
    marginRight:22,
  },
  formContainer:{
    flexDirection:'row',
    height:80,
    marginLeft:10,
    marginRight:100,
  },
  input:{
    height:48,
    borderRadius:5,
    overflow:'hidden',
    backgroundColor:'white',
    paddingLeft:16,
    flex:1,
    marginRight:5,
  },
  button:{
    height:47,
    borderRadius:5,
    backgroundColor:'#788eec',
    width:80,
    justifyContent:'center'
  },
  buttonText:{
    color:'white',
    fontSize:20
  },
  todoIcon: {
    marginTop:5,
    fontSize:20,
    marginLeft:14
  }

}) 
=======
export default Homescreen
>>>>>>> 897cb9997940cee072ee3bf4447edde0858d77ba
