import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS, Items } from "../components/database/Database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Cart = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }

    ToastAndroid.show("Items will be Deliverd SOON!", ToastAndroid.SHORT);

    navigation.navigate("Home");
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.key}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
        style={{
          width: "100%",
          height: 140,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "40%",
            height: 140,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={data.productImage}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: COLOURS.white,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                  color: COLOURS.white,
                }}
              >
                ${data.productPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginRight: 4,
                  padding: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 20,
                    color: COLOURS.white,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: COLOURS.white,
                }}
              >
                1
              </Text>
              <View
                style={{
                  marginLeft: 4,
                  padding: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 20,
                    color: COLOURS.white,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.white,
                  padding: 8,
                  opacity: 0.5,
                }}
              >
                REMOVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.dark,
        position: "relative",
      }}
    >
      <ScrollView>
        <Text
          style={{
            fontSize: 30,
            color: COLOURS.white,
            fontWeight: "400",
            letterSpacing: 1,
            margin: 15,
            textAlign: "center",
          }}
        >
          YOUR BAG
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              margin: 20,
              paddingVertical: 10,
              borderWidth: 0.9,
              borderRadius: 10,
              borderColor: COLOURS.white,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: COLOURS.white,
                fontWeight: "400",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              ORDER SUMMARY
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.white,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: COLOURS.white,
                }}
              >
                ${total}.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.white,
                }}
              >
                Estimated Shipping
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: COLOURS.white,
                }}
              >
                $5.90
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.white,
                }}
              >
                Shipping Discount
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: COLOURS.white,
                }}
              >
                $-5.90
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.white,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: COLOURS.white,
                }}
              >
                ${total}.00
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => (total != 0 ? checkOut() : null)}
              style={{
                marginTop: 20,
                height: 45,
                backgroundColor: COLOURS.teal,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  letterSpacing: 1,
                  color: COLOURS.white,
                }}
              >
                CHECKOUT NOW
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;
