import React,{useEffect,useState} from 'react';
// import { signOut,onAuthStateChanged } from 'firebase/auth';
// import {useNavigation} from '@react-navigation/core';
// import {stackNavigationProp} from '@react-navigation/native-stack'
// import { auth,db } from '../../firebase.js';
// import { set,ref,onValue, remove } from 'firebase/database';
// import {uid} from 'uid';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { Audio } from 'expo-av';



export default function Homescreen(navigation) {
  const [recording, setRecording]=useState();
  const [recordings, setRecordings]=useState([]);
  const [message, setMessage]=useState('');
  // const navigate= useNavigation();
//   useEffect(()=>{
//     auth.onAuthStateChanged((user)=>{
//       if(user){
//         onValue(ref(db,`/${auth.currentUser.uid}`),(snapshot)=>{
//           setRecordings([]);
//           const data= snapshot.val();
//           if(data !==null){
//             Object.values(data).map((recording)=>{
//               setRecordings((oldArray)=>[...oldArray,recording]);
//             });
//           }
//         });
//       }else if(!auth){
//         alert('you logged')
//       }
//     });
//   },[]);






  async function startRecording(){
    try{
      const permission = await Audio.requestPermissionsAsync();
      if(permission.status==='granted'){
        await Audio.setAudioModeAsync({
          allowsRecordingIOS:true,
          playsInSilentModeIOS:true
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }else{
        setMessage('please grant permission to app to access microphone');
      }
    }catch (err){
      console.error('failed to start recording')
    }
  }
  async function stopRecording(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const {sound , status}=await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound:sound,
      duration:getDurationFormatted(status.durationMills),
      file:recording.getURI()
    });
    setRecordings(updatedRecordings);
  }
  function getDurationFormatted(millis){
    let minutes = Math.floor(millis / 60000);
       let seconds = ((millis % 60000) / 1000).toFixed(0);
       return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" :
       "") + seconds);
  }
  function getRecordingLines(){

    return recordings.map((recordingLine, index)=>{
      return(
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording{index+1}-{recordingLine.duration}</Text>
          <Button style={styles.button} onPress={()=>recordingLine.sound.replayAsync() } title='play'/>
          {/* <Button style={styles.button} onPress={handleDelete} title='delte'/>
          <Button style={styles.button} onPress={writeToDatabase} title='save'/> */}
        </View>
      )
    });
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <View style={styles.bottonlogout}>
      </View>
      {/* <Button title='logout' onPress={handleSignOut}/> */}
      <Button
      title={recording ?'stop Recording' : 'start recording'}
      onPress={recording ? stopRecording : startRecording}/>
      <View>
      {getRecordingLines()}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  fill:{
    flex:1,
    margin:16
  },
  button:{
    margin:16
  },
  bottonlogout:{
    margin:10
  }
});