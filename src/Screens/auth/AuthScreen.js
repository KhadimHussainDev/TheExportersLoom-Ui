import React, { useContext } from "react";
import {
  View,
  ImageBackground,
  Text,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { IMAGES } from "../../utils/contants/images";
import createAuthStyles from "../../Styles/Screens/AuthStyle";
import useToggleAnimation from "../../utils/helpers/useToggleAnimation";
import { colors } from "../../Styles/Themes/colors";
import { AuthContext } from "../../context/providers/AuthContext";

const { width, height } = getWindowDimensions();
const styles = createAuthStyles(width, height);

const AuthScreen = () => {
  const { authType, customComponent } = useContext(AuthContext);
  const { bottomViewHeight, isMinimized, handleToggle } = useToggleAnimation(
    height * 0.9
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.SPLASH}
        style={styles.Imagebackground}
      ></ImageBackground>
      <TouchableWithoutFeedback onPress={isMinimized ? handleToggle : null}>
        <Animated.View
          style={[styles.bottomView, { height: bottomViewHeight }]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleToggle}>
            <Icon
              name={isMinimized ? "angle-double-up" : "times"}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={[styles.bottomText]}>{authType}</Text>
          {!isMinimized && <View>{customComponent}</View>}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AuthScreen;
