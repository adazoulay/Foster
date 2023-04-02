import { Slot } from "expo-router";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import PersistLogin from "../components/PersistLogin";

const Layout = () => {
  return (
    <Provider store={store}>
      <PersistLogin>
        <Slot />
      </PersistLogin>
    </Provider>
  );
};

export default Layout;
