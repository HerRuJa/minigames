import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedGestureHandler,
  withRepeat,
  withSequence,
  BounceIn,
} from "react-native-reanimated";
import {
  
  PanGestureHandler,
} from "react-native-gesture-handler";
import color from "../utils/color";


const FPS = 60;
const DELTA = 5000 / FPS;
let SPEED = 12;
const BALL_WIDTH = 12;
const paddle = { x: 100, y: 340, w: 150, h: 5 };
const pj = { w: 140, h: 20 };
const pj2 = { w: 140, h: 20 };

const normalize = (vector) => {
  const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
  };
};

export default function Ping(props) {
  const { setScore, score } = props;
  const [twop, setTwop] = React.useState(false);
  const [gameover, setGameover] = React.useState(true);

  const targetPositionX = useSharedValue(170);
  const targetPositionY = useSharedValue(250);

  const pjPos = useSharedValue({ x: 100, y: 680 });
  const pj2Pos = useSharedValue({ x: 100, y: 0 });

  const direction = useSharedValue(
    normalize({ x: Math.random(), y: Math.random() })
  );

  useEffect(() => {
    const interval = setInterval(() => { 
      if (!gameover) {
        updatePosition();
      }
    }, DELTA);

    return () => clearInterval(interval);
  }, [gameover]);

  const updatePosition = () => {
    let nextPos = getNextPos(direction.value);
    let newDirection = direction.value;
    //wall detection
    if (nextPos.x > 338 || nextPos.x < 0) {
      newDirection = { x: -direction.value.x, y: direction.value.y };
      direction.value = newDirection;
      nextPos = getNextPos(newDirection);
    }
    if (nextPos.y > 708 || nextPos.y < 0) {
      newDirection = { x: direction.value.x, y: -direction.value.y };
      direction.value = newDirection;
      nextPos = getNextPos(newDirection);
    }

    if (nextPos.y > 700) {
      setGameover(true);
      setScore(0);
      return;
    }

    //paddle detection
    if (
      nextPos.x < paddle.x + paddle.w &&
      nextPos.x + BALL_WIDTH > paddle.x &&
      nextPos.y < paddle.y + paddle.h &&
      BALL_WIDTH + nextPos.y > paddle.y
    ) {
      if (
        targetPositionX.value < paddle.x ||
        targetPositionX.value > paddle.x + paddle.w
      ) {
        //console.log("perdiste")
        newDirection = { x: -direction.value.x, y: direction.value.y };
        direction.value = newDirection;
        nextPos = getNextPos(newDirection);
      } else {
        //console.log("golpeaste top")
        setScore((s) => s + 1);
        SPEED += 0.5;
        newDirection = { x: direction.value.x, y: -direction.value.y };
        direction.value = newDirection;
        nextPos = getNextPos(newDirection);
      }
    }
    //pj detection
    if (
      nextPos.x < pjPos.value.x + pj.w &&
      nextPos.x + BALL_WIDTH > pjPos.value.x &&
      nextPos.y < pjPos.value.y + pj.h &&
      BALL_WIDTH + nextPos.y > pjPos.value.y
    ) {
      if (
        targetPositionX.value < pjPos.value.x ||
        targetPositionX.value > pjPos.value.x + pj.w
      ) {
        //console.log("perdiste")
        newDirection = {
          x: -direction.value.x + 5,
          y: direction.value.y,
        };
        direction.value = newDirection;
        nextPos = getNextPos(newDirection);
      } else {
        //console.log("golpeaste top")

        newDirection = {
          x: direction.value.x,
          y: -direction.value.y + Math.random(),
        };
        direction.value = newDirection;
        nextPos = getNextPos(newDirection);
      }
    }

    targetPositionX.value = withTiming(nextPos.x, {
      duration: DELTA,
      easing: Easing.linear,
    });
    targetPositionY.value = withTiming(nextPos.y, {
      duration: DELTA,
      easing: Easing.linear,
    });
  };

  const getNextPos = (direction) => {
    return {
      x: targetPositionX.value + direction.x * SPEED,
      y: targetPositionY.value + direction.y * SPEED,
    };
  };

  const ballAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: targetPositionY.value,
      left: targetPositionX.value,
    };
  });

  const pjAnimatedStyle = useAnimatedStyle(() => ({
    top: pjPos.value.y,
    left: pjPos.value.x,
  }));

//   const paddleAnimatedStyle = useAnimatedStyle(() => ({
//     width: withRepeat(
//         withSequence(
//             withTiming(paddle.w *1.075),
//             withTiming(paddle.w)
//         ), 3),
//     height: withRepeat(
//         withSequence(
//             withTiming(paddle.h *1.2),
//             withTiming(paddle.h)
//             ), 3),
//     opacity: withSequence(
//         withTiming(0),
//         withTiming(1),  
//     )
//   }),[score]);



  const gesture = useAnimatedGestureHandler({
    onStart: (event) => {

    },
    onActive: (event) => {
      pjPos.value = { ...pjPos.value, x: event.absoluteX - pj.w / 2 };
    },
  });

  const start = () => {
    setGameover(false);
    setScore(0);
    SPEED = 6.0;
    pjPos.value = { x: 100, y: 680 };
    targetPositionX.value = 170;
    targetPositionY.value = 250;
    direction.value = normalize({ x: Math.random(), y: Math.random() });
  };

  return (
    <View>
      <Text style={styles.score}>{score}</Text>
      {gameover && (
        <View style={styles.reset}>
          <Button title="Reset" onPress={start} />
        </View>
      )}
      {!gameover && <Animated.View style={[styles.ball, ballAnimatedStyle]} />}
      
      {/* paddle*/ }
      <Animated.View
        entering={BounceIn}
        key={score}
        style={{
          width: paddle.w,
          height: paddle.h,
          backgroundColor: "black",
          position: "absolute",
          top: paddle.y,
          left: paddle.x,
          borderRadius: 5,
        }}
      />

        
        
    
        {/* two player*/}
      {twop ? (
        <View
          style={{
            width: pj2.w,
            height: pj2.h,
            backgroundColor: "black",
            position: "absolute",
            top: pj2Pos.y,
            left: pj2Pos.x,
            borderRadius: 5,
          }}
        />
      ) : null}

      {gameover ? <Text style={styles.gameover}>Game Over</Text> : null}
          {/* pj*/}
      <Animated.View
        style={[
          {
            width: pj.w,
            height: pj.h,
            backgroundColor: "black",
            position: "absolute",
            top: pjPos.value.y,

            borderRadius: 5,
          },
          pjAnimatedStyle,
        ]}
      />

      <PanGestureHandler onGestureEvent={gesture}>
        <Animated.View style={styles.gesture} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: BALL_WIDTH,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: "black",
    position: "absolute",
  },
  score: {
    position: "absolute",
    fontSize: 30,
    fontStyle: "italic",

    color: "lightgrey",
    top: 550,
    left: 165,
  },
  gameover: {
    position: "absolute",
    top: 260,
    left: 20,
    fontSize: 50,
    color: "red",
  },
  gesture: {
    position: "absolute",
    top: 600,
    left: 0,
    width: "100%",
    height: 120,
    borderRadius: 3,
  },
  reset: {
    position: "absolute",
    width: "20%",
    top: 360,
    left: 140,
    backgroundColor: color.PRIMARY_COLOR_SOFT,
    borderRadius: 20,
  },
});
