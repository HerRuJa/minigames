import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import color from "../utils/color";

export default function Form(props) {
    const { juego, setJuego, setMenu } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.TextForm}>Elije un mini juego</Text>
      <View style={styles.ViewPicker}>
        <Picker
          selectedValue={juego}
          onValueChange={(itemValue, itemIndex) =>{
            setJuego(itemValue)
            setMenu(false)
          }
           
          }>
          <Picker.Item label="" value={0} />
          <Picker.Item label="Pin Pong" value={1} />
          <Picker.Item label="Space Wars" value={2} />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingHorizontal: 10,
        height: "20%",
        width: "60%",
        backgroundColor: color.FORM_COLOR,
        borderRadius: 10,
        
    },
    TextForm: {
        fontSize: 16,
        position: 'absolute',
        
        left: 29,
        top: 16,
    },
    ViewPicker: {
        position: 'absolute',
        left: 20,
        top: 60,
        width: '90%',
        height: '50%',
        padding: 0,
        backgroundColor: color.PICKER_COLOR,
        borderRadius: 10,
    },
});
