import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated,{useAnimatedStyle, useSharedValue,withTiming, Easing} from 'react-native-reanimated'


const FPS= 60
const DELTA = 1000 / FPS
const SPEED = 3
const normalize = (vector) => {
    const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    return {
        x: vector.x / magnitude, 
        y: vector.y / magnitude,
    }
}


export default function Ping() {
    const targetPositionX = useSharedValue(0)
    const targetPositionY = useSharedValue(0)
    const direction = useSharedValue(normalize({x: 1, y: 1}))
    

    useEffect(() => {
        const interval = setInterval(updatePosition, DELTA)

        return () => clearInterval(interval)
    }, [])

    const updatePosition = () => {
        targetPositionX.value =  withTiming(targetPositionX.value + direction.value.x * SPEED, {
            duration: DELTA, 
            easing: Easing.linear,
        })
        targetPositionY.value = withTiming(targetPositionY.value + direction.value.y * SPEED, {
            duration: DELTA,
            easing: Easing.linear,
        })
        
    }

    const ballAnimatedStyle = useAnimatedStyle(() => {

        return {
            top: targetPositionX.value,
            left: targetPositionY.value,
        }
    })


  return (
    <View>
      <Animated.View style={[styles.ball, ballAnimatedStyle]}/>
    </View>
  )
}

const styles = StyleSheet.create({
    ball: {
        width: 25,
        aspectRatio: 1,
        borderRadius: 25,
        backgroundColor: 'black',
        position: 'absolute',
        
    },

})