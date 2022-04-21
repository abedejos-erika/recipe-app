import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loading({ navigation }: any) {
  useEffect(() => {
    getUid();
  });

  async function getUid() {
    const uid = await AsyncStorage.getItem("uid");
    if (uid) navigation.push("Home");
    else navigation.push("Login");
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color="#2979ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
