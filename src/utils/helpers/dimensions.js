import { Dimensions } from "react-native";

const getWindowDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return { width, height };
};

export default getWindowDimensions;
