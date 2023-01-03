import React from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";

const Announcement = () => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "teal",
      height: 40,

      top: 0,
      left: 0,
      right: 0,
    }}
  >
    <Text small>Huge updates coming soon!</Text>
  </View>
);

export default Announcement;
