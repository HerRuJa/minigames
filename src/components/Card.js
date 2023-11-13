import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ping from './Ping'

export default function Card() {
  return (
    <View style={styles.card} >
        <Ping />
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        top: 175,

        width: 350,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black', 
        borderWidth: 5, 
        
    },
})