import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import Logo from "../assets/Logo.png";
import { AntDesign } from "@expo/vector-icons";

const ScreenHeaderBtn = () => {
  return (
    <TouchableOpacity>
      <AntDesign name='menufold' size={24} color='black' />
      <Image source={Logo} resizeMode='cover' style={styles.Image} />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});
