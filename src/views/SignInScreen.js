import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';



const SignInScreen = () => {
   const [phoneNumber, setPhoneNumber] = useState('');
   const [code, setCode] = useState('');
   const [verificationId, setVerificationId] = useState(null);
   const recaptchaVerifier = useRef(null);


   const sendVerification = () =>{
    if (!phoneNumber.trim()) {
      alert('Please Enter Phone Number');
      return;
    }else{
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
    .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
    .then(setVerificationId);
    setPhoneNumber('');
    }
  };
  const confirmCode = () =>{
    const credential=firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
    );
    firebase.auth().signInWithCredential(credential)
    .then(()=>{
        setCode('');
    })
    .catch((error) => {
        alert(error);
    })
    if (!code.trim()) {
      alert('Please Enter Code');
      return;
    }else{
    alert(
        'Welcome',
    );
    navigation.navigate('Homepage');
    }
  }
    return(
        <View style={styles.container}>

            <View style={{flexDirection: 'row', marginTop: 40}}>
                    <Text style={{fontWeight:'bold',fontSize:22,color:'#000'}}>
                         Audio
                    </Text>
                    <Text style={{marginleft:20,fontWeight:'bold',fontSize:22,color:'#64beff'}}>
                        Journal
                    </Text>

                </View>
                <View style={{marginTop:70}}>
                    <Text style={{fontSize:27, fontWeight: 'bold',color:'#000'}}>
                        Welcome Back
                    </Text>
                    <Text style={{fontSize:19, fontWeight: 'bold',color:'#a5a5a5'}}>
                        Sign in to continue
                    </Text>

                </View>


            <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            />
            <Text style={styles.otpText}>
                Login using OTP
            </Text>
            <TextInput
                placeholder='Phone Number with your code'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.TextInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>
                        Send Verification
                    </Text>
                </TouchableOpacity>
                <TextInput
                placeholder='Confirm code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.TextInput}
                />
                       <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.buttonText}>
                        Confirm Verification
                    </Text>
                </TouchableOpacity>
        </View>
    )
 }
export default SignInScreen
const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: '#F3F6FB',
            alignItems: 'center',
            justifyContent: 'center',
        },
        TextInput: {
            paddingTop:40,
            paddingBottom:20,
            paddingHorizontal:20,
            fontSize:24,
            borderBottomColor: '#fff',
            borderBottomWidth:2,
            marginBottom:20,
            textAlign:'center',
            color:'blue'
        },
        sendVerification:{
            padding:20,
            // backgroundColor:'black',
            borderRadius:10,
            backgroundColor: '#28388f'

        },
        sendCode: {
            padding:20,
            // backgroundColor:'black',
            borderRadius:10,
            backgroundColor: '#28388f'
        },
        buttonText: {
            textAlign:'center',
            color:'#fff',
            fontWeight:'bold',
            
        },
        otpText: {
            fontSize:24,
            fontWeight:'bold',
            color:'#000',
            margin:20,
        }
        });













// import React, {useRef, useState} from 'react';
// import { SafeAreaView, View, Text, TextInput,TouchableOpacity, Alert} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import COLORS from '../colors';
// import STYLES from '../STYLES';


// import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
// import { firebaseConfig } from '../config';
// import firebase from 'firebase/compat/app';








// const SignInScreen = () => {


//     const [phoneNumber, setPhoneNumber] = useState("");
//     const[code, setCode] = useState("");
//     const [verificationId, setVerificiationId] = useState(null);
//     const recaptchaVerifier = useRef(null);


//     const sendVerification = () => {
//         const phoneProvider = new firebase.auth.PhoneAuthProvider();
//         phoneProvider
//             .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
//             .then(setVerificationId);
//             setPhoneNumber('');
//        };

//        const confirmCode = () => {
//         const credential = firebase.auth.PhoneAuthProvider.credential(
//             verificationId,
//             code
//         );
//         firebase.auth().signInWithCredential(credential)
//         .then(() => {
//             setCode('')
//         })
//         .catch((error) => {
//             // show an alert in case of error
//             alert(error)
//         })
//         Alert.alert(
//             'Login Successful. Welcome To Your Journal Diary',
//         );
//   }
    



//   return (
//         <SafeAreaView
//             style={{paddingHorizontal:20,flex:1,backgroundColor:COLORS.white}}>
//             <ScrollView showsHorizontalScrollIndicator={false}>
                // <View style={{flexDirection: 'row', marginTop: 40}}>
                //     <Text style={{fontWeight:'bold',fontSize:22,color:COLORS.dark}}>
                //          Audio
                //     </Text>
                //     <Text style={{marginleft:20,fontWeight:'bold',fontSize:22,color:COLORS.secondary}}>
                //         Journal
                //     </Text>

                // </View>
                // <View style={{marginTop:70}}>
                //     <Text style={{fontSize:27, fontWeight: 'bold',color:COLORS.dark}}>
                //         Welcome Back
                //     </Text>
                //     <Text style={{fontSize:19, fontWeight: 'bold',color:COLORS.light}}>
                //         Sign in to continue
                //     </Text>

                // </View>
//                 <View style ={{marginTop:20}}>

//                         <FirebaseRecaptchaVerifierModal
//                             ref={recaptchaVerifier}
//                             firebaseConfig={app.options}
//                             // attemptInvisibleVerification
//                         />

//                     <View style = {STYLES.inputContainer }>
//                         <Icon name="AntDesign-outline" size={20} colors={COLORS.light} style={STYLES.inputIcon}/>
//                         <TextInput placeholder="Enter phonenumber" onChangeText={setPhoneNumber} keyboardType = "phone=pad" style={STYLES.input} secureTextEntry />
//                     </View>

//                     <View style={STYLES.btnPrimary}>
//                         <TouchableOpacity on Press={sendVerification}>
//                         <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}} >Sign In</Text>
//                         </TouchableOpacity> 
//                     </View>


//                     <View style = {STYLES.inputContainer }>
//                         <Icon name="AntDesign-outline" size={20} colors={COLORS.light} style={STYLES.inputIcon}/>
//                         <TextInput placeholder="Confirm Code" onChangeText={setCode} keyboardType = "number-pad" style={STYLES.input} secureTextEntry />
//                     </View>

//                     <View style={STYLES.btnPrimary}>
//                         <TouchableOpacity onPress={sendVerification}>
//                          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}} >Sign In</Text>
//                         </TouchableOpacity> 
//                     </View>
//                     <View style={STYLES.btnPrimary}>
//                         <TouchableOpacity on Press={confirmCode}>
//                         <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}} >Confirm verification</Text>
//                         </TouchableOpacity> 
//                     </View>
//                 </View>
//                 <View
//                         style={{
//                             flexDirection: 'row',
//                             alignItems: 'flex-end',
//                             justifyContent: 'center',
//                             marginTop: 40,
//                             marginBottom: 20,
//                         }}>
//                     <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
//                             Don`t have an account ?
//                     </Text>
//                         <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
//                             <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
//                             Sign up
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//             </ScrollView>
//         </SafeAreaView>

//   )
// }

// export default SignInScreen;