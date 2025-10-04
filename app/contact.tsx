import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import ShopBackground from "../assets/images/explore-coffee.jpeg";

const explore = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={ShopBackground} style={styles.image}>
        <Text style={styles.text}>Contact Us</Text>
      </ImageBackground>
    </View>
  );
};

//Styles Added:
//* flex: 1 -> Fills the entire screen when used in <View></View>
//* flexDirection: "column" -> Aligns the parents children in a column or in vertical direction
//* resizeMode :"cover" -> Used in image to fill the entire container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
    backgroundColor: "black",
    padding: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default explore;
