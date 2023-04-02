import { useState, useCallback } from "react";
import * as Contacts from "expo-contacts";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);

  const requestContacts = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setContacts(data);
      } else {
        console.log("No contacts found");
      }
    } else {
      console.log("Permission not granted");
    }
  }, []);

  return { contacts, requestContacts };
};
