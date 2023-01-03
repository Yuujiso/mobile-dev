import React from "react";
import { Image, View, Text } from "react-native";
import SubmitButton from "../components/SubmitButton";

const CategoryItem = ({ item }) => (
  <View
    style={{
      flexDirection: "row",
      flex: "none",
      flexDirection: "column",
      height: "10",
      alignSelf: "stretch",
      margin: "3",
      height: "60",
      position: "relative",
    }}
  >
    <Image
      source={require(item.img)}
      style={{
        alignSelf: "stretch",
        height: "100%",
      }}
      resizeMode="cover"
    />
    <View
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignSelf: "stretch",
        height: "100%",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          color: "white",
          marginBottom: 0,
          textAlign: "center",
          flex: 2,
        }}
      >
        {item.title}
      </Text>
      <SubmitButton title="SHOW NOW" />
    </View>
  </View>
);

export default CategoryItem;
