import React from "react";
import { Image, View } from "react-native";

const Logo = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={require("../assets/my-splash.png")}
      style={{
        width: 300,
        height: 200,
        marginVertical: 50,
      }}
    />
  </View>
);

export default Logo;
