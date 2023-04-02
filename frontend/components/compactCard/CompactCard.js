import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Note } from "iconsax-react-native";

const ContactCard = ({ cardInfo }) => {
  // console.log(cardInfo);

  let imgContent;

  if (cardInfo.imgUrl) {
    imgContent = <Image style={styles.userImage} source={{ uri: cardInfo.imgUrl }} />;
  } else {
    imgContent = <View style={styles.userImagePlaceholder} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContent}>
        <View style={styles.userInfo}>
          {imgContent}
          <Text style={styles.text}>{cardInfo.firstName + " " + cardInfo.lastName}</Text>
          <View>
            <Text style={styles.text}>{cardInfo.company}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const imageSize = 22;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    width: "90%",
    maxHeight: 35,
  },
  userContent: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 5,
    paddingLeft: 10,
  },
  userInfo: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  userImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: "50%",
    resizeMode: "cover",
  },
  userImagePlaceholder: {
    width: imageSize,
    height: imageSize,
    borderRadius: "50%",
    backgroundColor: "gray",
  },
  textWrapper: {
    height: "100%",
    width: "58%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  text: {
    fontSize: 13,
  },
  topRight: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    top: 10,
    right: 60,
    height: "90%",
  },
  interact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  activity: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "gray",
  },
});

export default ContactCard;
