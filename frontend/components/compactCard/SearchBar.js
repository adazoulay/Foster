import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearchText}
        value={searchText}
        placeholder='Search contacts'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    width: "95%",
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
