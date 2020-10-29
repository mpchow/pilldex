import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
//import RNMlKit from 'react-native-firebase-mlkit';
import vision from '@react-native-firebase/ml-vision';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
function NewPillScreen({ navigation }) {
  const [text, setText] = useState("");
  var camera;

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      // const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri); 
      // console.log('Text Recognition On-Device', deviceTextRecognition);
      // // for cloud (At the moment supports only Android)
      // const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
      // console.log('Text Recognition Cloud', cloudTextRecognition);
      console.log(data.uri);
      const processed = await vision().cloudDocumentTextRecognizerProcessImage(data.uri); 
      console.log('Found text in document: ', processed.text);

      processed.blocks.forEach(block => {
        console.log('Found block with text: ', block.text);
        console.log('Confidence in block: ', block.confidence);
        console.log('Languages found in block: ', block.recognizedLanguages);
      });

      return data.uri;
    }
  }

  function logPicture() {
    const uri = takePicture();
    
    navigation.navigate('CheckPill');
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
                        onPress={() => navigation.navigate('CheckPill', {uri: ""})}>
          <Text style={styles.btnText}>MANUAL</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}
                        onPress={() => logPicture()}>
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
