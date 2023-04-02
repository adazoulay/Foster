import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slices/AuthSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);

    const { userId, username } = decoded;

    console.log("decoded", userId, username);

    return { userId, username };
  }
  return {
    userId: "",
    username: "",
  };
};
export default useAuth;
