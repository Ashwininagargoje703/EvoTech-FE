import { View, Text } from "react-native";
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
      // Remove user details from AsyncStorage
      await logoutFromDevice();

      // Set the user to null in context
      setUser(null);

      // Navigate to the 'Login' screen
      navigation.navigate("Login");
    };

    // If user exists, initiate logout
    if (user) {
      logoutUser();
    }
  }, [user, navigation, setUser]);

  // If the user doesn't exist, there's no need to render anything here
  if (!user) {
    return null;
  }
};

export default Logout;
