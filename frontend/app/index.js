import { View, Text } from "react-native";
import React from "react";

import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

//! Maybe make search part of header, only middle switches between screen

const index = () => {
  const router = useRouter();
  const clearAsyncStorage = async () => {
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        if (Platform.OS === "android") {
          await AsyncStorage.clear();
        }
        if (Platform.OS === "ios") {
          await AsyncStorage.multiRemove(asyncStorageKeys);
        }
      }
      router.replace("/auth/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Text
      onPress={clearAsyncStorage}
      style={{
        textAlign: "center",
        paddingTop: 150,
      }}>
      Test
    </Text>
  );
};

export default index;
