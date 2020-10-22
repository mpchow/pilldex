import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Logo from '../components/Logo';
import auth, { firebase } from '@react-native-firebase/auth';

function NewUserScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("");

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={{height: 30}} />
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
          secureTextEntry={true}
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => setPassword(text)}
      />
      <TextInput
          placeholder = "Preferred Language"
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => setLanguage(text)}
      />
      

      <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => {console.log(name, email, password, language); 
                                          register(email, password); }}>
          <Text style={styles.btnText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 40,
    color: '#538083'
  },
  input: {
    width: 315,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Inter-Light'
  },
  text: {
    fontFamily: 'Quicksand', 
    fontSize: 20, color: '#000000', 
    paddingTop: 26,
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
});


export default NewUserScreen;
