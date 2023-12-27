import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllForms } from "../store/formSlice";
import { base_url } from "../api/http";
import axios from "axios";
import { ActivityIndicator, Snackbar } from "react-native-paper";

const FormListScreen = ({ navigation }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { forms } = useSelector((store) => store.form);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.email) {
      dispatch(getAllForms());
    }
  }, [user]);

  const deleteForm = async (formId) => {
    try {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this form?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const response = await axios.post(`${base_url}/form/deleteForm`, {
                formId,
              });
              setSnackbarMessage("Form deleted successfully");
              setSnackbarVisible(true);
              dispatch(getAllForms());
              dispatch(getAllForms());
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const renderFormItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditForm", { formData2: item })}
          >
            <Feather name="edit-2" size={18} color="#114c8d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteForm(item._id)}>
            <Feather name="trash-2" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Array.isArray(forms) ? (
        forms.length === 0 ? (
          <Text>No Data Found</Text>
        ) : (
          <>
            <Text style={styles.heading}>You Forms Submited Data</Text>

            <FlatList
              data={forms}
              renderItem={renderFormItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </>
        )
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000} // Adjust the duration as needed
        action={{
          label: "Dismiss",
          onPress: () => setSnackbarVisible(false),
        }}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
    color: "#114c8d",
  },
  card: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    position: "relative",
    backgroundColor: "white",
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  buttons: {
    position: "absolute",
    top: 10,
    right: 10,
    bottom: 10,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  snackbar: {
    backgroundColor: "#114c8d",
  },
});

export default FormListScreen;
