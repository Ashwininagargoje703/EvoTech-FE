import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const logoutFromDevice = async () => {
    await AsyncStorage.removeItem("userDetails");
  };

  useEffect(() => {
    const logoutUser = async () => {
      await logoutFromDevice();
      setUser(null);
      navigation.navigate("Login");
    };
    if (user) {
      logoutUser();
    }
  }, [user, navigation, setUser]);
  if (!user) {
    return null;
  }
};

export default Logout;
