import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import Logout from "./Logout";
import Form from "./Form";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon pack you want to use
import FormListScreen from "./FormList";
import EditForm from "./EditForm";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { user } = useContext(AuthContext);

  const handleCloseButton = () => {
    props.navigation.closeDrawer();
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.image}
          />
        </View>
        <TouchableOpacity
          onPress={handleCloseButton}
          style={styles.closeButton}
        >
          <IconButton icon="close" color="#000" onPress={handleCloseButton} />
        </TouchableOpacity>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function AllRoutes({ navigation }) {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  return (
    <Drawer.Navigator
      initialRouteName="Login"
      backBehavior="history"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleAlign: "center",
        drawerActiveTintColor: "#114c8d",
        headerTitle: () => (
          <Text style={{ fontWeight: "800", fontSize: 18 }}>
            Evotech Global
          </Text>
        ),
      }}
    >
      {!user && <Drawer.Screen name="Login" component={LoginScreen} />}

      <Drawer.Screen name="Form" component={Form} />
      {user && <Drawer.Screen name="FormList" component={FormListScreen} />}
      {user && <Drawer.Screen name="Logout" component={Logout} />}
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{ drawerLabel: () => null }}
      />
      {user && (
        <Drawer.Screen
          name="EditForm"
          component={EditForm}
          options={{ drawerLabel: () => null }}
        />
      )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjust as needed
    paddingHorizontal: 16, // Add padding for spacing
  },
  imageContainer: {
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "80%",
    height: 35,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  closeButton: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
});
