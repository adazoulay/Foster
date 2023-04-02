import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useContacts } from "../../../hooks/useGetLocalContacts";
import { Link } from "expo-router";

const EditContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const { contacts, requestContacts } = useContacts();

  const getLocalContacts = async () => {
    console.log(contacts);
    await requestContacts();
    console.log(contacts);
  };

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getLocalContacts}>
        <Text>Get Contacts</Text>
      </TouchableOpacity>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        spellCheck={false}
        autoCorrect={false}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        spellCheck={false}
        autoCorrect={false}
      />

      <Text style={styles.label}>Company:</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize='none'
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize='none'
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize='none'
      />

      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize='none'
        multiline={true}
      />

      <Link
        href={{
          pathname: "/home/editContact/selectRel",
          params: { firstName, lastName, company, phone, email, notes },
        }}>
        <Text>Next</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginBottom: 10,
  },
});

export default EditContact;
