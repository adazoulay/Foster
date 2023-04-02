import { useRef, useState, useEffect } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/AuthSlice";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const errRef = useRef();
  const [username, setUsername] = useState("adam");
  const [password, setPassword] = useState("pw");
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const canSave = [username, password].every(Boolean) && !isLoading;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (canSave) {
      try {
        const { accessToken } = await login({ username, password }).unwrap();
        dispatch(setCredentials({ accessToken }));
        await AsyncStorage.setItem("token", accessToken);
        setUsername("");
        setPassword("");
        router.replace("/home");
      } catch (err) {
        if (!err.status) {
          setErrMsg("No Server Response");
        } else if (err.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg(err.data?.message);
        }
      }
    }
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <Text ref={errRef} className='' aria-live='assertive'>
        {errMsg}
      </Text>
      <Text>Username</Text>
      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        spellCheck={false}
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        spellCheck={false}
      />
      <Button title='Sign In' onPress={handleSubmit} />
    </View>
  );
};

export default Login;
