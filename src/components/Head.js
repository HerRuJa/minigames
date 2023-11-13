import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../utils/color'

export default function Head(props) {
    const {verForm} = props
  return (
    <View style={styles.container}>
      <View style={styles.button}>
            <Button 
            style={styles.buttonBackg} 
            title='Menu' 
            onPress={verForm}></Button>
      </View>
        <View style={styles.menu}>
                <Text style={styles.titleText} >Mini-Games</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:35,
        height: '12%',
        width: '100%',
        backgroundColor: color.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    menu: {
        position: 'absolute',
        left: 150,
        top: 40,
         
    },
    titleText:{
        fontSize: 30,
        color: 'white',
    },
    button: {
        position: 'absolute',
        left: 15,
        top: 50,
        width: 100,
        
    },
    buttonBackg: {
        backgroundColor: color.PRIMARY_COLOR,
    },

})