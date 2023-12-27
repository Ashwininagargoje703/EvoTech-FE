import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Card, IconButton, TextInput } from "react-native-paper";
import { ImageBackground } from "react-native";
import { base_url } from "../api/http";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("Form");
    }
  }, [user]);

  const handleRegister = async () => {
    try {
      let payload = {
        fullName: fullName,
        email: email,
        password,
      };
      console.log("Payload", payload);

      const response = await axios.post(`${base_url}/user/register`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("🥳🤗 Successfully registered!");
        setErrorMessage("");
        await AsyncStorage.setItem("userDetails", JSON.stringify(payload));
        navigation.navigate("Login");
      } else {
        setSuccessMessage("");
        setErrorMessage(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setSuccessMessage("");
      setErrorMessage("☹️😥Registration failed. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Text style={styles.headerText}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          right={<TextInput.Icon icon="account-box" />}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
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
    borderColor: "#f7f6f9",
  },
  iconContainer: {
    position: "absolute",
    right: 6,
  },

  card: {
    padding: 20,
    width: "90%",
    backgroundColor: "#f3f8fc",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
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
    marginBottom: 16,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 16,
  },
  loginLinkText: {
    color: "#114c8d",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  successText: {
    fontWeight: "bold",
    color: "green",
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
  },
});

export default RegisterScreen;
