import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Logo from '../components/Logo.js'
import LoginStack from '../navigation/LoginStack.js';

const width = Dimensions.get('window').width;

function SignInScreen({ navigation }) {
  // authentication states to be sent to AuthProvider
  const { register, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pilldex</Text>
      <Logo />
      <TextInput
        placeholder = "Full Name"
        style= {styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText = {(text) => setName(text)}
      />
    <View style={{height: 0.5, width: width - 60, marginTop: -5, backgroundColor:'#000'}} />
      <TextInput
        testID="Email-Input-Login"
        placeholder = "Email"
        style= {styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText = {(text) => setEmail(text)}
      />
    <View style={{height: 0.5, width: width - 60, marginTop: -5, backgroundColor:'#000'}} />
      <TextInput
        testID="Password-Input-Login"
        placeholder = "Password"
        style= {styles.input}
        secureTextEntry={true}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText = {(text) => setPassword(text)}
      />
    <View style={{height: 0.5, width: width - 60, marginTop: -5, backgroundColor:'#000'}} />
      <View style={{height: 20}} />
      <TouchableOpacity style={styles.button}
                        onPress={() => login(email, password)}>
        <Text style={styles.btnText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.newUserButton}
                        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.newUserBtnText}>NEW USER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 60,
    color: '#538083'
  },
  input: {
    width: width - 60,
    height: 50,
    marginTop: 25,
    fontSize: 18,
    fontFamily: 'Quicksand-Light'
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10
  },
  newUserButton: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  newUserBtnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#9FB7B9',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default SignInScreen;
