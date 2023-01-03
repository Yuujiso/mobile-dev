import React, { useState } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import Announcement from "../components/Announcement";
import Logo from "../components/Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("SIGN UP REQUEST =>", name, email, password);
    try {
      const { data } = await axios.post("http://localhost:8000/api/signup", {
        name,
        email,
        password,
      });
      setLoading(false);
      console.log("SING IN SUCCESS => ", data);
      alert("Sign up successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View>
        <Logo />
        <Text title center>
          Sign Up
        </Text>

        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text small center>
          Have an account?{" "}
          <Text onPress={() => navigation.navigate("Login")} color="#ff2222">
            Log In
          </Text>
        </Text>
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
