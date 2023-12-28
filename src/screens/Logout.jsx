import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();
  const { setUser } = useContext(AuthContext);
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        dispatch(logoutUser());
        setUser(null);
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error occurred during logout:", error);
      }
    };

    if (user) {
      handleLogout();
    }
  }, [dispatch, navigation, setUser, user]);

  return null;
};

export default Logout;
