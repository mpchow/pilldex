import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            if (email == "" || email == null)
              Alert.alert("Please enter a valid email");
            else if (password == "" || password == null)
              Alert.alert("Please enter a password");
            else
              await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            if (e.code == 'auth/invalid-email')
              Alert.alert("Invalid Email Address");
            if (e.code == 'auth/user-disabled')
              Alert.alert("This user has been disabled");
            if (e.code == 'auth/user-not-found')
              Alert.alert("User not found, please try again");
            if (e.code == 'auth/wrong-password')
              Alert.alert("Incorrect Password");

            console.log(e);
            console.log('Sign in Failed');
          }
        },
        register: async (email, password, routine) => {
          try {
            if (email == "" || email == null)
              Alert.alert("Please enter a valid email");
            else if (password == "" || password == null)
              Alert.alert("Please enter a password");
            else {
              const wake = routine[0]["time"].split(":");
              const sleep = routine[1]["time"].split(":");
              const bfast = routine[2]["time"].split(":");
              const lunch = routine[3]["time"].split(":");
              const din = routine[4]["time"].split(":");
              await auth().createUserWithEmailAndPassword(email, password)
                    .then( async (user) => {
                      const token = await firebase.messaging().getToken();
                      fetch('http://ec2-35-183-198-103.ca-central-1.compute.amazonaws.com:3000/users', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          token: token,
                          userId: user.user.uid,
                          wakeupHr: parseInt(wake[0]),
                          wakeupMin: parseInt(wake[1]),
                          wakeupAM: routine[0]["AM"],
                          sleepHr: parseInt(sleep[0]),
                          sleepMin: parseInt(sleep[1]),
                          sleepAM: routine[1]["AM"],
                          breakfastHr: parseInt(bfast[0]),
                          breakfastMin: parseInt(bfast[1]),
                          breakfastAM: routine[2]["AM"],
                          lunchHr: parseInt(lunch[0]),
                          lunchMin: parseInt(lunch[1]),
                          lunchAM: routine[3]["AM"],
                          dinnerHr: parseInt(din[0]),
                          dinnerMin: parseInt(din[1]),
                          dinnerAM: routine[4]["AM"],
                          schedule: [[], [], [], [], [], [], []]
                        })
                      });
                    });
            }
          } catch (e) {
            if (e.code === 'auth/email-already-in-use')
              Alert.alert("An account already exists with this email");
            if (e.code === 'auth/invalid-email')
              Alert.alert("Invalid Email Address");
            if (e.code === 'auth/weak-password')
              Alert.alert("This password is too weak, please enter a new one");

            console.log(e);
            console.log('Create User Failed');
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
            console.log('Sign out Failed');
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
