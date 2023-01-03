import React, { useState } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import Announcement from "../components/Announcement";
import Logo from "../components/Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("SIGN UP REQUEST =>", email, password);
    try {
      const { data } = await axios.post("http://localhost:8000/api/login", {
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
          Log In
        </Text>

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
          title="Log In"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text small center>
          Not yet registered?{" "}
          <Text onPress={() => navigation.navigate("Signup")} color="#ff2222">
            Sing Up
          </Text>
        </Text>

        <Text small center color="orange" style={{ marginTop: 10 }}>
          Forgot Password?
        </Text>
        {/* <Text>{JSON.stringify({ email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
