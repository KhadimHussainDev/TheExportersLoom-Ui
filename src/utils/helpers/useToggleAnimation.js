import { useState, useEffect } from "react";
import { Animated } from "react-native";
import getWindowDimensions from "../../utils/helpers/dimensions";

const useToggleAnimation = (initialHeight) => {
  const [bottomViewHeight] = useState(new Animated.Value(initialHeight));
  const [isMinimized, setIsMinimized] = useState(false);
  const [animationRunning, setAnimationRunning] = useState(false);
  const { width, height } = getWindowDimensions();

  useEffect(() => {
    if (animationRunning) {
      Animated.timing(bottomViewHeight, {
        toValue: isMinimized ? height * 0.13 : height * 0.9,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setAnimationRunning(false));
    }
  }, [isMinimized, animationRunning]);

  const handleToggle = () => {
    if (!animationRunning) {
      setAnimationRunning(true);
      setIsMinimized(!isMinimized);
    }
  };

  return { bottomViewHeight, isMinimized, handleToggle };
};

export default useToggleAnimation;
