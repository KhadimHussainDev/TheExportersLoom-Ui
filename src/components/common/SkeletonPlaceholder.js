import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const SkeletonPlaceholder = ({ children, backgroundColor = '#E1E9EE', highlightColor = '#F2F8FC', speed = 800 }) => {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: speed,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: speed,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity, speed]);

  return (
    <View style={styles.container}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          backgroundColor,
          highlightColor,
          opacity,
        });
      })}
    </View>
  );
};

SkeletonPlaceholder.Item = ({ width, height, borderRadius = 4, marginBottom = 0, marginRight = 0, backgroundColor, opacity }) => {
  return (
    <Animated.View
      style={[
        styles.item,
        {
          width,
          height,
          borderRadius,
          marginBottom,
          marginRight,
          backgroundColor,
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    backgroundColor: '#E1E9EE',
  },
});

export default SkeletonPlaceholder; 