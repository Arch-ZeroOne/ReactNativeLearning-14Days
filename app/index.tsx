import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import React from "react";
import icedCoffeeImage from "../assets/images/iced-coffee.png";
//TODO Explore the explore.tsx file and apply what is here
const app = () => {
  return (
    <View style={style.container}>
      <ImageBackground source={icedCoffeeImage} style={style.image}>
        <Text style={style.text}>Coffee Shop</Text>
        <Link href="/contact" style={{ marginHorizontal: "auto" }} asChild>
          <Pressable style={style.button}>
            <Text style={style.buttonText}>Contact Us</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontFamily: "Arial",
    marginBottom: 120,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  link: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
    backgroundColor: "black",
    textDecorationLine: "underline",
    padding: 4,
  },
  button: {
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    padding: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    padding: 4,
  },
});
export default app;
