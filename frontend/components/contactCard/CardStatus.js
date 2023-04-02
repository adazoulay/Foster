import { View, StyleSheet, Image } from "react-native";
import React from "react";
import status_0 from "../../assets/trees/0.png";
import status_1 from "../../assets/trees/1.png";
import status_2 from "../../assets/trees/2.png";
import status_3 from "../../assets/trees/3.png";

const CardStatus = ({ status }) => {
  let content;

  switch (status) {
    case 0:
      content = <Image style={styles.image} source={status_0} />;
      break;
    case 1:
      content = <Image style={styles.image} source={status_1} />;
      break;
    case 2:
      content = <Image style={styles.image} source={status_2} />;
      break;
    case 3:
      content = <Image style={styles.image} source={status_3} />;
      break;
    default:
      content = <Image style={styles.image} source={status_0} />;
  }

  return <View style={styles.imgWrapper}>{content}</View>;
};

const styles = StyleSheet.create({
  imgWrapper: {
    backgroundColor: "gray",
    width: "15%",
    height: 68,
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    marginTop: 20,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    verticalAlign: "bottom",
  },
});

export default CardStatus;
