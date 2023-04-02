import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useRouter, useSearchParams, Link } from "expo-router";
import { useGetAllContactsQuery } from "../../../redux/api/ContactsApiSlice";
import ContactCard from "../../../components/compactCard/CompactCard";
import SearchBar from "../../../components/compactCard/SearchBar";

const Home = () => {
  const { data, isLoading, isSuccess } = useGetAllContactsQuery();

  const router = useRouter();

  return (
    <>
      <View style={styles.homeFeed}>
        <SearchBar />
        {isSuccess &&
          data.ids.map((id) => {
            return (
              <Link
                key={id}
                href={{ pathname: "/home/contacts/contact", params: { contactId: id } }}>
                <ContactCard cardInfo={data.entities[id]} />
              </Link>
            );
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
