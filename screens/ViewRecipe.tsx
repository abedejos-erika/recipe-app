import React from "react";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

export default function ViewRecipe({ navigation, route }: any) {
  const recipe = JSON.parse(route.params.recipe);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="white" />
          <Text style={styles.headerTitle}>View Recipe</Text>
        </View>

        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.recipe}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.desc}>{recipe.desc}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(recipe.link)} style={styles.button} activeOpacity={0.8}>
              <Ionicons name="logo-youtube" size={50} color="white" />
              <Text style={styles.buttonText}>Open Link</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    paddingTop: 50,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "poppins-bold",
    backgroundColor: "#2979ff",
  },
  headerTitle: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
  recipe: {
    padding: 10,
  },
  image: {
    height: 200,
    elevation: 5,
    width: "100%",
  },
  desc: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "poppins-bold",
  },
  box: {
    height: 300,
    width: "100%",
  },
  button: {
    height: 150,
    width: "95%",
    elevation: 3,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5393ff",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontFamily: "poppins-bold",
  },
});
