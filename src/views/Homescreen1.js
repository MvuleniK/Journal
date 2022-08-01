import React,{useState,useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable} from 'react-native';
import {firebase} from '../config';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
// import {FontAwesome} from '@expo/vector-icons';
import {Audio} from 'expo-av';











const Homescreen = () => {

    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();


    const [recording,setRecording] = React.useState();

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
          .catch(error => {
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
              .then(() => {
                  setAddData('');

                  // release keyboard
                  Keyboard.dismiss();

                  // Audio recording part
                  // try{
                  //   const permission = await Audio.requestPermissionsAsync()

                  //   if(permission.status === "granted") {
                  //     await Audio.setAudioModeAsync({
                  //       allowsRecordingIOS:true,
                  //       playsInSilentModeIOS:true
                  //     });
  
                  //     const {recording} = await Audio.Recording.createAsync(
                  //       Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                  //     );
                  //       setRecording(recording);
                  //   } else {
                  //     setMessage("Please grant permission to app to access microphone")
                  //   };
                  // }


                  try {
                    
                    console.log('Requesting permissions..');
                    await Audio.requestPermissionsAsync();
                    await Audio.setAudioModeAsync({
                      allowsRecordingIOS: true,
                      playsInSilentModeIOS: true,
                    }); 
                    console.log('Starting recording..');
                    const recording = new Audio.Recording();
                    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                    await recording.startAsync(); 
                    setRecording(recording);
                    console.log('Recording started');
                  } catch (err) {
                    console.error('Failed to start recording', err);
                  }
                }

            })

            .catch((error) => {
              alert(error);
            })
        }
    }


  return (
    <View style={{flex:1}}>
      <View style={styles.formContainer}>
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

          </View>
          <FlatList
            data = {todos}
            numColumns={1}
            renderItem={({item}) => (
              <View>
                  <Pressable
                    style = {styles.container}
                    onPress ={() => navigation.navigate('Detail',{item})}
                  >

                    <FontAwesome
                        name = 'trash-o'
                        color = 'red'
                        onPress={() => deleteTodo(item)}
                        style = {styles.todoIcon}
                        />
                      <View style={styles.innerContainer} >
                        <Text style ={styles.itemHeading}>
                          {item.heading[0].toUpperCase() + item.heading.slice(1)}

                        </Text>
                      </View>

                  </Pressable>
              </View>
            ) }
          />
          </View>


      {/* </View> */}
    </View>
  )
}

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
