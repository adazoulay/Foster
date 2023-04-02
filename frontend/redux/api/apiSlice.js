import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../slices/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.0.0.177:3500",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("1");

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log("2");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    // console.log("2:", refreshResult);
    if (refreshResult?.data) {
      console.log("3");
      api.dispatch(setCredentials({ ...refreshResult.data }));
      await AsyncStorage.setItem("token", refreshResult.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("4");
      if (refreshResult?.error?.status === 403) {
        console.log("5");
        refreshResult.error.data.message = "Your login has expired.";
      }
      console.log("6");
      return refreshResult;
    }
  }
  console.log("7");
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Contact"],
  endpoints: (builder) => ({}),
});
