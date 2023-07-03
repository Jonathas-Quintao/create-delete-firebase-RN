import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import {collection, getFirestore, getDocs, addDoc, doc, deleteDoc} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { TextInput, Button } from 'react-native';

const firebaseApp = initializeApp( {
    apiKey: "AIzaSyDEdlnbWnEZTIeX6AHj0GxMTK_7a27EPPQ",
    authDomain: "crud-828b9.firebaseapp.com",
    projectId: "crud-828b9",
    
  });

  export default function App(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [users, setUsers] = useState([])

    const db = getFirestore(firebaseApp)
    const useCollectionRef = collection(db, 'users')

    async function criarUser() {
      const user = await addDoc(useCollectionRef, {
        name,
        email,
      })
    }

    async function deleteUser(id){
      const userDoc = doc(db, 'users', id)
      await deleteDoc(userDoc)
    }


    useEffect(() =>{
      const getUsers = async () => {
        const data = await getDocs(useCollectionRef)
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
      getUsers()
    }, [])

    

    return (
      <View style={{flex: 1}}>

        <TextInput 
        style={{backgroundColor: '#029BE3', marginTop: 30, height: 50}} placeholder='DIGITE O NOME'
        value={name} onChangeText={(name) => setName(name)}
        />

        <TextInput 
        style={{backgroundColor: '#029BE3', marginTop: 30, height: 50}} placeholder='DIGITE O EMAIL'
        value={email} onChangeText={(email) => setEmail(email)}
        />

        <Button title='criar' onPress={criarUser}> </Button>



        <FlatList 
        keyExtractor = {(item) => item.id}
        data = {users}
        renderItem={({item}) =>
        <View style={Style.container}>
          <Text>{item.name} </Text>
          <Text>{item.email}</Text>
          <Button title='deletar' onPress={() => deleteUser(item.id)} />
        </View>
      }
        />


      </View>
    )
  }

  const Style = StyleSheet.create({
    container:{
      backgroundColor: 'orange',
      height: 80,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })