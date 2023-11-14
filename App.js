import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Head from './src/components/Head';
import Body from './src/components/Body';
import { useState } from 'react';
import color from './src/utils/color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [score, setScore] = useState(0)
  const [menu, setMenu] = useState(true)
  const [juego, setJuego] = useState(0)
  function verForm(){
    setMenu(true)
    setJuego(0)
    setScore(0)
    console.log(menu)
  }
  return (

      <GestureHandlerRootView style={styles.container}>
        <Head verForm={verForm}/>
        <Body 
        menu={menu} setMenu={setMenu}
        juego={juego} setJuego={setJuego}
        score={score} setScore={setScore}
        />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.PRIMARY_COLOR_SOFT,
    
  },
});
