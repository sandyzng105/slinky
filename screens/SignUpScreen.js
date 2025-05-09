// SignUpScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseInit.js'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async () => {
    if (password !== confirm) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Main');
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="you@example.com"
            placeholderTextColor="#555"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={t => { setEmail(t); setErrorMsg(''); }}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            placeholderTextColor="#555"
            secureTextEntry
            value={password}
            onChangeText={t => { setPassword(t); setErrorMsg(''); }}
          />
        </View>

        {/* Confirm */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            placeholderTextColor="#555"
            secureTextEntry
            value={confirm}
            onChangeText={t => { setConfirm(t); setErrorMsg(''); }}
          />
        </View>

        {/* Error */}
        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Sign Up */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSignUp}
        >
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have account */}
        <View style={styles.footerLinkContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:            { flex: 1, backgroundColor: '#0C1C2C' },
  headerContainer:      { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  headerBox:            { backgroundColor:'#142A3E', borderRadius:16, padding:16, alignItems:'center' },
  headerTitle:          { color:'#5DFDCB', fontSize:20, fontWeight:'bold' },

  scrollContent:        { paddingHorizontal:20, paddingBottom:40 },

  inputContainer:       { backgroundColor:'#142A3E', borderRadius:16, padding:16, marginBottom:12 },
  inputLabel:           { color:'#A0D8EF', fontSize:12, marginBottom:6 },
  textInput:            { color:'#fff', fontSize:16, borderBottomWidth:1, borderBottomColor:'#5DFDCB', paddingVertical:4 },

  errorBox:             { backgroundColor:'#EB5757', borderRadius:12, padding:8, marginBottom:12 },
  errorText:            { color:'#fff', fontSize:12, textAlign:'center' },

  primaryButton:        { backgroundColor:'#5DFDCB', borderRadius:16, paddingVertical:14, alignItems:'center', marginTop:10 },
  primaryButtonText:    { color:'#0C1C2C', fontSize:16, fontWeight:'bold' },

  footerLinkContainer:  { flexDirection:'row', justifyContent:'center', marginTop:20 },
  footerText:           { color:'#A0D8EF', fontSize:14 },
  footerLink:           { color:'#5DFDCB', fontSize:14, fontWeight:'bold' },
});

export default SignUpScreen;
