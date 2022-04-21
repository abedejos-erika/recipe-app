import * as yup from "yup";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { db, storage, ref, collection, addDoc, getDownloadURL, uploadBytesResumable } from "../firebase";

export default function Recipe({ navigation }: any) {
  const [image, setImage] = React.useState<string>("");
  const [load, setLoad] = React.useState<boolean>(false);

  const recipeFormSchema = yup.object({
    title: yup.string().required("Title is required."),
    desc: yup.string().required("Description is required."),
  });

  const _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3] });

    if (!result.cancelled) {
      _handleImagePicked(result.uri);
      setImage(result.uri);
      setLoad(true);
    }
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] });

    if (!result.cancelled) {
      _handleImagePicked(result.uri);
      setImage(result.uri);
      setLoad(true);
    }
  };

  const _handleImagePicked = async (uri: string) => {
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    let nam = parseInt(Date.now().toString());
    const uploadTask = uploadBytesResumable(ref(storage, `${nam}`), blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert(error);
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: string) => {
          setImage(downloadURL);
          setLoad(false);
        });
      }
    );
  };

  const submit = async (values: any, actions: any) => {
    const { title, desc, link } = values;
    const uid = await AsyncStorage.getItem("uid");
    if (image) {
      setLoad(true);
      await addDoc(collection(db, "recipes"), {
        timestamp: Date.now(),
        title,
        image,
        desc,
        link,
        uid,
      })
        .then(() => {
          setImage("");
          setLoad(false);
          actions.resetForm();
          navigation.navigate("Home");
        })
        .catch((err) => {
          alert(err);
        });
    } else alert("Please select an image.");
  };

  return (
    <ScrollView style={styles.ScrollViewContainer}>
      <View style={styles.container}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.titleContainer}>
            <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="white" />
            <Text style={styles.titletextContainer}>Add New Recipe</Text>
          </View>

          <Formik initialValues={{ desc: "", link: "", title: "", img: "" }} onSubmit={submit} validationSchema={recipeFormSchema}>
            {({ handleChange, handleSubmit, values, errors }) => (
              <Fragment>
                <View style={styles.textboxContainer}>
                  <TextInput
                    mode={"outlined"}
                    label="Recipe Title"
                    value={values.title}
                    autoComplete={false}
                    style={{ marginTop: 20 }}
                    onChangeText={handleChange("title")}
                    error={errors.title ? true : false}
                  />
                  {errors.title && <Text style={styles.textvalidationContainer}>{errors.title}</Text>}
                  <TextInput
                    mode={"outlined"}
                    label="Description"
                    value={values.desc}
                    autoComplete={false}
                    error={errors.desc ? true : false}
                    onChangeText={handleChange("desc")}
                    style={{ marginBottom: 5, marginTop: 5 }}
                  />
                  {errors.desc && <Text style={styles.textvalidationContainer}>{errors.desc}</Text>}
                  <TextInput
                    mode={"outlined"}
                    value={values.link}
                    autoComplete={false}
                    label="Youtube Video Link"
                    style={{ marginBottom: 10 }}
                    onChangeText={handleChange("link")}
                    error={errors.link ? true : false}
                  />
                  {errors.link && <Text style={styles.textvalidationContainer}>{errors.link}</Text>}
                </View>

                <View style={styles.row}>
                  <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <FontAwesome name="cloud-upload" size={35} color="white" />
                    <Text style={styles.buttonText}>Pick a photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={_takePhoto} style={styles.button}>
                    <Entypo name="camera" size={35} color="white" />
                    <Text style={styles.buttonText}>Camera</Text>
                  </TouchableOpacity>
                </View>

                {errors.img && <Text style={styles.textvalidationContainer}>{errors.img}</Text>}

                {!!image && <Image source={{ uri: image }} style={styles.img} />}
                <View style={styles.buttonContainer}>
                  <Button
                    title="Submit"
                    loading={load}
                    disabled={load}
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.buttonstyleContainer}
                    titleStyle={{ color: "#ffff", fontFamily: "poppins-bold" }}
                  />
                </View>
              </Fragment>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    padding: 10,
    paddingTop: 50,
    flexDirection: "row",
    fontFamily: "poppins-bold",
    backgroundColor: "#2979ff",
  },
  titletextContainer: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    fontFamily: "poppins-bold",
  },
  textboxContainer: {
    flex: 0,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "white",
  },
  textvalidationContainer: {
    color: "red",
    paddingBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  buttonstyleContainer: {
    backgroundColor: "#2979ff",
    borderRadius: 5,
    width: "100%",
    padding: 10,
  },
  footerRow: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  footerText: {
    color: "black",
  },
  box: {
    paddingTop: 5,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  boxText: {
    fontSize: 15,
    marginLeft: 15,
    color: "skyblue",
    fontWeight: "bold",
    fontFamily: "poppins-bold",
    textDecorationLine: "underline",
  },
  ScrollViewContainer: {
    marginHorizontal: 0,
    flexGrow: 1,
    backgroundColor: "white",
  },
  img: {
    height: 200,
    width: "95%",
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "center",
  },
  button: {
    height: 100,
    width: "49%",
    elevation: 3,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5393ff",
  },
  buttonText: {
    fontSize: 16,
    marginTop: 5,
    color: "white",
    fontFamily: "poppins-bold",
  },
  row: {
    width: "95%",
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
