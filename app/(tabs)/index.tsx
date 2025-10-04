import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import icedCoffeeImage from "../../assets/images/iced-coffee.png";
//TODO Explore the explore.tsx file and apply what is here
const app = () => {
  return (
    <View style={style.container}>
      <ImageBackground source={icedCoffeeImage} style={style.image}>
        <Text style={style.text}>Coffee Shop</Text>
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
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
export default app;
