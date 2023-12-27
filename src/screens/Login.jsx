import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { Card, IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    try {
      const userDetails = await AsyncStorage.getItem("userDetails");
      if (userDetails !== null) {
        const storedUser = JSON.parse(userDetails);

        if (
          email.toLowerCase() === storedUser.email &&
          password === storedUser.password
        ) {
          dispatch(loginUser(storedUser));
          setUser(storedUser);
          navigation.navigate("Form");
        } else {
          alert("Incorrect email or password. Please try again.");
        }
      } else {
        alert("No user found for the entered email. Please register.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Text style={styles.headerText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          right={<TextInput.Icon icon="email" />}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={secureTextEntry}
          />
          <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
            <View style={styles.iconContainer}>
              <IconButton
                icon={secureTextEntry ? "eye-off" : "eye"}
                color="#000"
                onPress={togglePasswordVisibility}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>
            Not have an account? Register
          </Text>
        </TouchableOpacity>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
  },
  iconContainer: {
    position: "absolute",
    right: 3,
  },
  card: {
    padding: 20,
    width: "90%",
    height: "50%",
    backgroundColor: "#f3f8fc",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#114c8d",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#f7f6f9",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f3f8fc",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#114c8d",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 16,
    fontSize: 20,
  },
  loginLinkText: {
    color: "#114c8d",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
