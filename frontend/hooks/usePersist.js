import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usePersist = () => {
  const [persist, setPersist] = useState(false);

  useEffect(() => {
    const fetchPersist = async () => {
      try {
        const persistValue = await AsyncStorage.getItem("persist");
        setPersist(persistValue ? JSON.parse(persistValue) : false);
      } catch (error) {
        console.log("Error fetching persist:", error);
      }
    };

    fetchPersist();
  }, []);

  useEffect(() => {
    const storePersist = async () => {
      try {
        await AsyncStorage.setItem("persist", JSON.stringify(persist));
      } catch (error) {
        console.log("Error storing persist:", error);
      }
    };

    storePersist();
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
