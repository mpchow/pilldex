import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Logo from '../components/Logo.js'

function SignInScreen() {
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
      <TextInput
        placeholder = "Email"
        style= {styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText = {(text) => setEmail(text)}
      />
      <TextInput
        placeholder = "Password"
        style= {styles.input}
        secureTextEntry={true}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText = {(text) => setPassword(text)}
      />
      <View style={{height: 20}} />
      <TouchableOpacity style={styles.button}
                        onPress={() => login(email, password)}>
        <Text style={styles.btnText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => register(email, password)}>
        <Text style={styles.btnText}>NEW USER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 60,
    color: '#538083'
  },
  input: {
    width: 315,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 15,
    marginTop: 25,
    fontSize: 18,
    fontFamily: 'Inter-Light'
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
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default SignInScreen;
