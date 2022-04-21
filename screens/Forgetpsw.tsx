import React, { useState } from "react";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { auth, sendPasswordResetEmail } from "../firebase";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");

  const resetPsw = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email sent successfully");
        navigation.push("Login");
      })
      .catch((error: any) => alert(error));
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titletextContainer}>Reset Password</Text>
        </View>

        <View style={styles.textboxContainer}>
          <TextInput
            value={email}
            label="Email"
            mode={"outlined"}
            autoComplete={false}
            style={{ marginBottom: 1 }}
            onChangeText={(text: string) => setEmail(text)}
            right={<TextInput.Icon name="email" color={"#2979ff"} />}
          />
          <View style={styles.forgotpwContainer}>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Login")}>
              Login
            </Text>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Signup")}>
              Register
            </Text>
          </View>

          <Button
            onPress={resetPsw}
            title={"Reset Password"}
            titleStyle={styles.buttontitleContainer}
            buttonStyle={{ padding: 7, marginTop: 15, borderRadius: 5, backgroundColor: "#2979ff" }}
          />
        </View>
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
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "white",
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
