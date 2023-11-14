import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ping from './Ping'

export default function Card(props) {
    const {setScore, score} = props
  return (
    <View style={styles.card} >
        <Ping score={score} setScore={setScore} />
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        top: 17,
        padding: 0,
        width: 350,

        height: 720,
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor: 'black', 
        borderWidth: 0, 
        
    },
})