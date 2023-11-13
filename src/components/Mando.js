import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Mando() {
  return (
    <View style={styles.container}>
        <View style={styles.mando}>
            <Text>Mando</Text>
        </View>
        <View style={styles.mando2}>
            <Text>Mando</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        height: '88%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mando: {
        position: 'absolute',
        top: 550,
        width:'80%',
        height: '20%',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
    },
    mando2: {
        position: 'absolute',
        top: 0,
        width:'80%',
        height: '20%',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
    },
})