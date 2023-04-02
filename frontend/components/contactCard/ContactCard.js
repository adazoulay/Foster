import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import CardStatus from "./CardStatus";
import { useUpdateTimestampMutation } from "../../redux/api/ContactsApiSlice";

import { Note, Refresh, UserEdit } from "iconsax-react-native";
import FlipCard from "react-native-flip-card";
import { isLoading } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
import Timer from "../util/Timer";

const ContactCard = ({ cardInfo }) => {
  const [updateTimeStamp, { isLoading, isSuccess }] = useUpdateTimestampMutation();

  let imgContent;

  if (cardInfo.imgUrl) {
    imgContent = <Image style={styles.userImage} source={{ uri: cardInfo.imgUrl }} />;
  } else {
    imgContent = <View style={styles.userImagePlaceholder} />;
  }

  const handleRefresh = async () => {
    //TEST IF WORKS
    console.log("ID", cardInfo._id);
    await updateTimeStamp({ id: cardInfo._id });
    console.log("updated");
  };

  return (
    <View style={styles.container}>
      <FlipCard friction={10}>
        {/* Front Side */}
        <View style={styles.cardContent}>
          <CardStatus status={cardInfo.relationship} />
          <View style={styles.userContent}>
            <View style={styles.userInfo}>
              {imgContent}
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{cardInfo.firstName + " " + cardInfo.lastName}</Text>
                <Text style={styles.text}>{cardInfo.company}</Text>
                <Text style={styles.text}>Last message:</Text>
              </View>
            </View>
            <View style={styles.topRight}>
              <View style={styles.interact}>
                <Note />
                <View style={styles.activity} />
              </View>
              <View>
                <Timer lastUpdated={cardInfo.lastUpdated} />
              </View>
            </View>
          </View>
        </View>
        {/* Back side */}
        <View style={styles.cardContent}>
          <View style={styles.userContent}>
            <TouchableOpacity onPress={handleRefresh}>
              <Refresh />
            </TouchableOpacity>
            <UserEdit />
          </View>
        </View>
      </FlipCard>
    </View>
  );
};

const imageSize = 55;

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    width: "90%",
    minHeight: 70,
    maxHeight: 70,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
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
    justifyContent: "flex-start",
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
