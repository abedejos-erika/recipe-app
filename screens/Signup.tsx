import * as yup from "yup";
import moment from "moment";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import React, { Fragment, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { auth, createUserWithEmailAndPassword, setDoc, doc, db } from "../firebase";

export default function Signup({ navigation }: any) {
  const [hide, setHide] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const emailError = "Invalid email address.";
  const passwordError = "Password must contain at least 8 to 16 characters, a combination of upper and lowercase letters, and at least one number or symbol.";
  const cpnumError = "Invalid mobile number.";

  const registerSchema = yup.object({
    name: yup.string().required("First Name is required."),
    birthday: yup
      .mixed()
      .test("valid-date", "Please select date from calendar.", (val) => moment(val, "DD-MM-YYYY").isValid())
      .test("valid-length", "Please enter a valid date.", (val) => {
        return val ? val.replace(/[-_]/g, "").length === 8 : false;
      })
      .test("is-of-age", "You must be 18 years or older to sign up.", (val) => {
        return moment().diff(moment(val, "DD-MM-YYYY"), "year") >= 18;
      }),
    address: yup.string().required("Address is required."),
    mobilenumber: yup.string().required("Mobile Number is required."),
    //.matches(/^9\d{9}$/, cpnumError),
    email: yup
      .string()
      .required("Email address is required.")
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, emailError),
    password: yup
      .string()
      .required("Password is required.")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, passwordError),
  });

  const handleCheckDate = (handleChange: any, date: string) => {
    return handleChange(date);
  };

  const signupHandler = (values: any) => {
    const { mobilenumber, name, password, birthday, address, email } = values;
    console.log("🚀 ~ file: Signup.tsx ~ line 50 ~ signupHandler ~ values", values);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user.uid;
        await AsyncStorage.setItem("uid", user);
        await setDoc(doc(db, "users", user), {
          name,
          address,
          birthday,
          mobilenumber,
        }).then(() => {
          navigation.push("Home");
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView style={styles.ScrollViewContainer}>
      <View style={styles.container}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.titleContainer}>
            <Text style={styles.titletextContainer}>Create an Account</Text>
          </View>

          <Formik
            initialValues={{
              mobilenumber: "",
              password: "",
              birthday: "",
              address: "",
              email: "",
              name: "",
            }}
            onSubmit={signupHandler}
            validationSchema={registerSchema}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <Fragment>
                <View style={styles.textboxContainer}>
                  <TextInput
                    label="Full Name"
                    mode={"outlined"}
                    value={values.name}
                    autoComplete={false}
                    style={{ marginTop: 10 }}
                    onChangeText={handleChange("name")}
                    error={errors.name ? true : false}
                  />
                  {errors.name && <Text style={styles.textvalidationContainer}>{errors.name}</Text>}
                  <View
                    style={{
                      width: "100%",
                      position: "relative",
                      alignItems: "center",
                      flexDirection: "row",
                      backgroundColor: "white",
                    }}
                  >
                    <View style={{ width: "100%", backgroundColor: "white" }}>
                      <TextInput
                        value={values.birthday}
                        mode={"outlined"}
                        onChangeText={handleChange("birthday")}
                        label={"Birthday"}
                        error={errors.birthday ? true : false}
                        autoComplete={false}
                        style={{ marginTop: 5 }}
                      />
                      {errors.birthday && <Text style={styles.textvalidationContainer}>{errors.birthday}</Text>}
                    </View>
                    <TouchableOpacity onPress={() => setVisible(true)} style={{ position: "absolute", right: 8, top: 20 }}>
                      <Ionicons name="calendar" size={30} color="#2979ff" />
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={visible}
                    mode="date"
                    onConfirm={(date) => {
                      var dd = String(date.getDate()).padStart(2, "0");
                      var mm = String(date.getMonth() + 1).padStart(2, "0");
                      var yyyy = date.getFullYear();

                      setVisible(false);
                      handleCheckDate(handleChange("birthday"), `${dd}-${mm}-${yyyy}`);
                    }}
                    onCancel={() => setVisible(false)}
                    isDarkModeEnabled={false}
                  />

                  <TextInput
                    label="Address"
                    mode={"outlined"}
                    value={values.address}
                    autoComplete={false}
                    style={{ marginBottom: 5, marginTop: 5 }}
                    onChangeText={handleChange("address")}
                    error={errors.address ? true : false}
                  />
                  {errors.address && <Text style={styles.textvalidationContainer}>{errors.address}</Text>}
                  <TextInput
                    label="Mobile Number (+63)"
                    mode={"outlined"}
                    value={values.mobilenumber}
                    keyboardType={"number-pad"}
                    autoComplete={false}
                    style={{ marginBottom: 5 }}
                    onChangeText={handleChange("mobilenumber")}
                    error={errors.mobilenumber ? true : false}
                  />
                  {errors.mobilenumber && <Text style={styles.textvalidationContainer}>{errors.mobilenumber}</Text>}
                  <TextInput
                    label="E-mail Address"
                    mode={"outlined"}
                    keyboardType={"email-address"}
                    value={values.email}
                    autoComplete={false}
                    style={{ marginBottom: 5 }}
                    right={<TextInput.Icon name="email" color={"#2979ff"} />}
                    onChangeText={handleChange("email")}
                    error={errors.email ? true : false}
                  />
                  {errors.email && <Text style={styles.textvalidationContainer}>{errors.email}</Text>}
                  <TextInput
                    label="Password"
                    mode={"outlined"}
                    value={values.password}
                    autoComplete={false}
                    style={{ marginBottom: 5 }}
                    onChangeText={handleChange("password")}
                    error={errors.password ? true : false}
                    right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => setHide(!hide)} color={"#2979ff"} />}
                    secureTextEntry={!hide}
                  />
                  {errors.password && <Text style={styles.textvalidationContainer}>{errors.password}</Text>}
                </View>

                <View style={styles.box}>
                  <Text style={styles.boxText} onPress={() => navigation.navigate("Login")}>
                    Already have an account? Login
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    title="Register"
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
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#2979ff",
    fontFamily: "poppins-bold",
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
});
