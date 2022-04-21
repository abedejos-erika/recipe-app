import React from "react";
import { signOut, auth } from "../firebase";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ navigation }: any) {
  function addRecipe() {
    navigation.navigate("AddRecipe");
  }

  const logout = async () => {
    await AsyncStorage.removeItem("uid");
    signOut(auth).finally(() => navigation.navigate("Login"));
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Home</Text>

      <View style={styles.row}>
        <AntDesign name="plussquare" size={22} color="white" onPress={addRecipe} style={{ marginRight: 15 }} />
        <FontAwesome name="sign-out" size={25} color="white" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  header: {
    padding: 10,
    paddingTop: 50,
    flexDirection: "row",
    backgroundColor: "#2979ff",
    fontFamily: "poppins-bold",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
});
