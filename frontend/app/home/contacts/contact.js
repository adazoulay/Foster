import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useSearchParams } from "expo-router";
import { useGetAllContactsQuery } from "../../../redux/api/ContactsApiSlice";

const contactPage = () => {
  const { contactId } = useSearchParams();
  console.log("contactId", contactId);

  const { contact, isSuccess } = useGetAllContactsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      contact: data.entities[contactId],
    }),
  });

  useEffect(() => {
    console.log("contact", contact);
  }, [contact, isSuccess]);

  return (
    <View>
      <Text>{contact.firstName}</Text>
      <Text>{contact.lastName}</Text>
      <Text>{contact.company}</Text>
      {/* <Text>{contact.}</Text> */}
      <Text>{contact.notes}</Text>
    </View>
  );
};

export default contactPage;
