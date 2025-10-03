import { View, Text, StyleSheet } from "react-native";
import React from "react";

const app = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Coffee Shop</Text>
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
  },
});
export default app;
