import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import vision from '@react-native-firebase/ml-vision';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function NewPillScreen({ navigation }) {
  const [text, setText] = useState("");
  var camera;
  
  // Function that takes a picture and parses info
  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      console.log(data.uri);
      const processed = await vision().cloudDocumentTextRecognizerProcessImage(data.uri);
      console.log('Found text in document: ', processed.text);

      // Make post request and sends parsed info
      fetch('http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/pills/label', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: processed.text
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response from server is", responseJson);
        navigation.navigate("CheckPill", {info: responseJson['pillData']});
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }



  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
      <Text style={styles.title}>New Prescription</Text>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={{
          height: height * 0.8,
          width: width,
          marginBottom: -85
        }}
        captureAudio={false}

     >
     </RNCamera>
     <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
       <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('CheckPill', {info: {
                          name: null,
                          totalQuantity: null,
                          frequency: null,
                          frequencyUnit: null,
                          withFood: null,
                          withSleep: null,
                          dosage: null,
                        }})}>
          <Text style={styles.btnText}>MANUAL</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}
                        onPress={() => takePicture()}>
         <Text style={styles.btnText}>CONFIRM</Text>
       </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 32,
    color: '#000',
    marginBottom: 5
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginHorizontal: 10,
    marginBottom: 20
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default NewPillScreen;