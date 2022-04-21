import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { auth, signInWithEmailAndPassword } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await AsyncStorage.setItem("uid", user.user.uid);
        setLoad(false);
        setEmail("")
        setPassword("")
        navigation.push("Home");
      })
      .catch((error) => {
        setLoad(false);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titletextContainer}>Login</Text>
        </View>

        <View style={styles.lottieContainer}>
          <LottieView source={require("../assets/lottie/83255-connect.json")} autoPlay={true} loop={true} />
        </View>

        <View style={styles.textboxContainer}>
          <TextInput
            label="Email"
            mode={"outlined"}
            value={email}
            autoComplete={false}
            right={<TextInput.Icon name="email" color={"#2979ff"} />}
            style={{ marginBottom: 1 }}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
          />
          <TextInput
            label="Password"
            mode={"outlined"}
            value={password}
            autoComplete={false}
            secureTextEntry={!visible}
            right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => setVisible(!visible)} color={"#2979ff"} />}
            onChangeText={(text: string) => setPassword(text)}
          />
          <View style={styles.forgotpwContainer}>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Forgetpsw")}>
              Forgot Password?
            </Text>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Signup")}>
              Register?
            </Text>
          </View>
        </View>

        <Button
          loading={load}
          title={"Log In"}
          buttonStyle={{
            padding: 7,
            marginTop: 30,
            borderRadius: 5,
            marginHorizontal: 20,
            backgroundColor: "#2979ff",
          }}
          onPress={loginHandler}
          titleStyle={styles.buttontitleContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  lottieContainer: {
    flex: 0.4,
    marginTop: 50,
    backgroundColor: "white",
  },
  titleContainer: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#2979ff",
  },
  titletextContainer: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
  subtitleContainer: {
    padding: 20,
    fontSize: 17,
    color: "black",
    fontWeight: "500",
    textAlign: "center",
  },
  textboxContainer: {
    flex: 0,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  buttontitleContainer: {
    color: "#ffff",
    fontFamily: "poppins-bold",
  },
  forgotpwContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  forgotpwtextContainer: {
    fontSize: 15,
    color: "skyblue",
    fontWeight: "bold",
    paddingVertical: 0,
    textDecorationLine: "underline",
  },
});
