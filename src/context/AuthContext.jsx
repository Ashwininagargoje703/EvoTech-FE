import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserDataFromLocalStrorage = async () => {
    let userdata = await AsyncStorage.getItem("userDetails");
    setUser(JSON.parse(userdata));
  };

  useEffect(() => {
    getUserDataFromLocalStrorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
