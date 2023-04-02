import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useRefreshMutation } from "../redux/api/authApiSlice";
import usePersist from "../hooks/usePersist";
import { selectCurrentToken } from "../redux/slices/AuthSlice";

const PersistLogin = ({ children }) => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  console.log("In PersistLogin");

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess, isError, error }] = useRefreshMutation();
  const router = useRouter();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) verifyRefreshToken();

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    content = children;
  } else if (isLoading) {
    content = <Text>Loading...</Text>;
  } else if (isError) {
    content = (
      <View>
        <Text>
          {`${error?.data?.message} - `}
          <Text onPress={() => router.replace("auth/login")}>Please login again</Text>
        </Text>
      </View>
    );
  } else if (isSuccess && trueSuccess) {
    content = children;
  } else if (token) {
    content = children;
  }
  return <>{content}</>;
};

export default PersistLogin;
