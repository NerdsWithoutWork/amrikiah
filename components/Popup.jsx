import { Text, Animated } from "react-native";
import React, { useRef, useEffect, useState } from "react";

export default function Popup({ message, trigger }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const didMountRef = useRef(false);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const [hardMessage, setHardMessage] = useState("");

  useEffect(() => {
    if (didMountRef.current) {
      // This code runs only after the first mount
      setHardMessage(message);
      startAnimation();
    } else {
      // Skipping the effect on initial mount
      didMountRef.current = true;
    }
  }, [trigger]);

  return (
    <Animated.View
      style={[{ opacity: fadeAnim }]}
      className="absolute z-20 top-20 rounded-2xl py-4 px-2 bg-Agrey-200"
    >
      <Text className="text-center text-Tertiary">{hardMessage}</Text>
    </Animated.View>
  );
}
