import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Card, Snackbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllForms } from "../store/formSlice";
import { base_url } from "../api/http";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditForm = ({ route }) => {
  const { formData2 } = route.params;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedImageUri, setSelectedImageUri] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(formData2.title);
    setDescription(formData2.description);
    setSelectedImageUri(formData2.imageUrl);
  }, [formData2]);

  const selectImageFromGallery = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setSelectedImageUri(pickerResult.uri); // Set the selected image URI
    }
    setModalVisible(false);
  };

  const imageClickFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!pickerResult.cancelled) {
      setSelectedImageUri(pickerResult.uri); // Set the selected image URI
    }
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!user.email) {
        alert("Please login");
        return;
      }
      if (!selectedImageUri) {
        alert("Please select an image");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", {
        uri: selectedImageUri,
        type: "image/jpeg",
        name: "image" + new Date().getTime() + ".jpg",
      });

      const imageUploadResponse = await axios.post(
        `${base_url}/form/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = imageUploadResponse.data.data || selectedImageUri;

      const formDataPayload = {
        formId: formData2._id,
        title,
        description,
        imageUrl: imageUrl,
      };
      console.log(formDataPayload);

      const formSubmitResponse = await axios.post(
        `${base_url}/form/updateForm`,
        formDataPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (formSubmitResponse.data.success) {
        dispatch(getAllForms());
        setSnackbarMessage("Form updated Or Edit successfully!");
        setSnackbarVisible(true);
        navigation.navigate("FormList");
      } else {
        console.error(
          "Form submission failed:",
          formSubmitResponse.data.message
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Edit Form</Text>
        <Card style={styles.card}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.imageContainer}>
              {selectedImageUri ? (
                <Image
                  source={{ uri: selectedImageUri }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbTARUXzSGvW92IbKIlYAmhlYg0keybYReTTH-96oCTBsWTCItKjnwZmU8EpEPS2COXtg&usqp=CAU",
                  }}
                  style={styles.image}
                />
              )}
              <View style={styles.editIcon}>
                <Feather name="edit-2" size={24} color="black" />
              </View>
            </View>

            {/* modal */}
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text>Select Gallary Or Camera For Upload </Text>
                    <View style={{ flexDirection: "row", gap: 30 }}>
                      <TouchableOpacity
                        onPress={selectImageFromGallery}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/Galary.png")}
                          style={styles.Image}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={imageClickFromCamera}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/camer.png")}
                          style={styles.Image}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* modal */}
          </TouchableOpacity>

          <Text>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Text>Description</Text>

          <TextInput
            style={styles.input}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <View style={styles.btncontainer}>
            <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
              <Text style={styles.ButtonText}>
                {isLoading ? "Editing..." : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    padding: 20,
    width: "90%",
    backgroundColor: "white",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 40,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    position: "relative",
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 10,
    color: "#114c8d",
    fontWeight: "800",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
  editIcon: {
    position: "absolute",
    right: 5,
    bottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 6,
    borderRadius: 25,
    zIndex: 1,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  btncontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  Button: {
    backgroundColor: "#114c8d",
    height: 45,
    width: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    gap: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  Image: {
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 8,
    resizeMode: "cover",
  },
  snackbar: {
    backgroundColor: "#114c8d",
  },
});

export default EditForm;
