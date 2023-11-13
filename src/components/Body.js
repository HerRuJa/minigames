import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../utils/color'
import Form from './Form'
import Card from './Card'
import Mando from './Mando'


export default function Body(props) {
    const {menu,setMenu,juego,setJuego} = props
  return (
    <View style={styles.container}>
      { menu ? <Form juego={juego} setJuego={setJuego} setMenu={setMenu}/> : <Card />}
        {juego === 1 ?  <Mando /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        height: '88%',
        width: '100%',
        backgroundColor: color.PRIMARY_COLOR_SOFT,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    
})