import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { useGetAllContactsQuery } from "../../redux/api/ContactsApiSlice";
import ContactCard from "../../components/contactCard/ContactCard";

const Home = () => {
  router = useRouter();
  const { data, isLoading, isSuccess } = useGetAllContactsQuery();

  return (
    <>
      <View style={styles.homeFeed}>
        {isSuccess &&
          data.ids.map((id) => {
            return <ContactCard key={id} cardInfo={data.entities[id]} />;
          })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  homeFeed: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});

export default Home;
