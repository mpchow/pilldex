import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
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
        register: async (email, password) => {
          try {
            if (email == "" || email == null)
              Alert.alert("Please enter a valid email");
            else if (password == "" || password == null)
              Alert.alert("Please enter a password");
            else
              await auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
              fetch('http://ec2-35-183-198-103.ca-central-1.compute.amazonaws.com:3000/user', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: user.user.uid
                })
              });
            })
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
