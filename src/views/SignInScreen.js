import React, {useRef, useState} from 'react';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { SafeAreaView, View, Text, TextInput,TouchableOpacity, Alert, StyleSheet } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../colors';
import STYLES from '../STYLES';
import {firebaseConfig} from '../firebase';

function SignInScreen() {


    const [phoneNumber, setPhoneNumber] = useState('');
    const[code, setCode] = useState('');
    const [verificationId, setVerifciationId] = useState(null);
    const recaptchaVerifier = useRef(null);


    const sendVerification = () = > {
        const phoneProvider = new firebase.auth.PhoneAuthProvider ();
        phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
        .then(sendVerification);
        setPhoneNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCreden
    }

  return (
        <SafeAreaView
            style={{paddingHorizontal:20,flex:1,backgroundColor:COLORS.white}}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row', marginTop: 40}}>
                    <Text style={{fontWeight:'bold',fontSize:22,color:COLORS.dark}}>
                         Audio
                    </Text>
                    <Text style={{marginleft:20,fontWeight:'bold',fontSize:22,color:COLORS.secondary}}>
                        Journal
                    </Text>

                </View>
                <View style={{marginTop:70}}>
                    <Text style={{fontSize:27, fontWeight: 'bold',color:COLORS.dark}}>
                        Welcome Back
                    </Text>
                    <Text style={{fontSize:19, fontWeight: 'bold',color:COLORS.light}}>
                        Sign in to continue
                    </Text>

                </View>
                <View style ={{marginTop:20}}>
                    <View style = {STYLES.inputContainer }>
                        <Icon name="AntDesign-outline" size={20} colors={COLORS.light} style={STYLES.inputIcon}/>
                        <TextInput placeholder="Enter phonenumber" style={STYLES.input} secureTextEntry/>
                    </View>

                    <View style={STYLES.btnPrimary}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Sign In</Text>
                    </View>


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            marginTop: 40,
                            marginBottom: 20,
                        }}>
                    <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                            Don`t have an account ?
                    </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
                            Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

  )
}

export default SignInScreen;