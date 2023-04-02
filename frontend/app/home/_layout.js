import { Stack } from "expo-router";
import Footer from "../../components/layout/Footer";

const Layout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Footer />
    </>
  );
};

export default Layout;
