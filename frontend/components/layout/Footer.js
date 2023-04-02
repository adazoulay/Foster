import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Home, Personalcard, AddSquare, Data, UserSquare } from "iconsax-react-native";

const Footer = () => {
  return (
    <>
      <View style={styles.footer}>
        <View>
          <Link href='/home'>
            <Home />
          </Link>
        </View>
        <View>
          <Link href='/home/contacts'>
            <Personalcard />
          </Link>
        </View>
        <View>
          <Link href='/home/addNew'>
            <AddSquare />
          </Link>
        </View>
        <View>
          <Link href='/home/AI'>
            <Data />
          </Link>
        </View>
        <View>
          <Link href='/home/profile'>
            <UserSquare />
          </Link>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "fixed",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    marginHorizontal: 20,
  },
});

export default Footer;
