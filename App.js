import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllRoutes from "./src/screens/AllRoutes";

export default function App() {
  return (
    <>
      <StatusBar />
      <AllRoutes />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
