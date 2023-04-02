import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useSearchParams } from "expo-router";
import { useAddNewContactMutation } from "../../../redux/api/ContactsApiSlice";
import { useRouter } from "expo-router";

import CardStatus from "../../../components/contactCard/CardStatus";

const selectRel = () => {
  const [relashionshipStatus, setRelashionshipStatus] = useState("");

  const { firstName, lastName, company, phone, email, notes } = useSearchParams();
  const [addNewContact, { isLoading, isSuccess }] = useAddNewContactMutation();

  const router = useRouter();

  const handleSubmit = async () => {
    await addNewContact({
      firstName,
      lastName,
      company,
      phone,
      email,
      notes,
      relationship: relashionshipStatus,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      //! TODO ROUTE OUT
    }
  }, [isSuccess]);

  const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  };

  const handleStatusSelect = (status) => {
    console.log(status);
    setRelashionshipStatus(status);
  };

  return (
    <View style={styles.selectRel}>
      {Array.from({ length: 4 }, (_, i) => i).map((status) => (
        <TouchableOpacity
          key={status}
          onPress={() => handleStatusSelect(status)}
          style={[styles.card, relashionshipStatus === status ? shadowStyle : null]}>
          <CardStatus status={status} />
          <View style={styles.textWrapper}>
            <Text>Card {status}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  selectRel: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    width: "90%",
    maxHeight: 70,
  },
  textWrapper: {
    flexDirection: "column",
  },
});

export default selectRel;
