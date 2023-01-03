import React from "react";
import { categories } from "../assets/data";
import CategoryItem from "./CategoryItem";
import { View } from "react-native";

const Categories = () => (
  <View
    style={{
      padding: 30,
      maxWidth: 1200,
      marginLeft: "auto",
      marginRight: "auto",
      flexWrap: "wrap",
      justifyContent: "space-between",
    }}
  >
    {categories.map((item) => (
      <CategoryItem item={item} key={item.id} />
    ))}
  </View>
);

export default Categories;
