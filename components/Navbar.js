import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Tab = ({ name, title }) => (
  <TouchableOpacity>
    <>
      <MaterialIcons
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{title}</Text>
    </>
  </TouchableOpacity>
);

export default function Navbar() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Tab name="home" title="Home" />
      <Tab name="category" title="Categories" />
      <Tab name="shop" title="Cart" />
      <Tab name="person" title="Account" />
    </View>
  );
}
