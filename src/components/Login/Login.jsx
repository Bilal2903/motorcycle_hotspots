import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../../config/firebase";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("Home");
      } catch (err) {
        setError("Ongeldige gebruikersnaam of wachtwoord.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(200).duration(2000).springify()}
      >
        <Text style={styles.headerText}>Login</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(3000).springify()}
      >
        <Text style={styles.title}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Image
            style={{ width: 16, height: 16, marginRight: 12 }}
            source={require("../../../assets/mail.png")}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder=""
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(3000).springify()}
      >
        <Text style={styles.title}>Password</Text>
        <View style={styles.inputContainer}>
          <Image
            style={{ width: 16, height: 16, marginRight: 12 }}
            source={require("../../../assets/lock.png")}
          />
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry
            placeholder=""
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
      </Animated.View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Animated.View
        entering={FadeInDown.delay(500).duration(3000).springify()}
      >
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).duration(3000).springify()}
      >
        <Text style={styles.orText}>Or</Text>
        <View style={styles.signUpTextContainer}>
          {/* Google */}
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../../../assets/google.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../../../assets/facebook.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../../../assets/apple.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(700).duration(3000).springify()}
      >
        <View style={styles.signUpTextContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpText}>Don't have an account yet?</Text>
            <Text style={styles.signUpLink}>Sign up here</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 90,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    color: "#4B5563", // text-gray-700
    borderRadius: 8,
    borderColor: "#E5E7EB", // border-gray-200
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    width: "100%",
  },
  errorText: {
    textAlign: "left",
    color: "red",
    marginBottom: 24,
    marginTop: -14,
  },
  button: {
    paddingVertical: 12,
    backgroundColor: "#1E3A8A", // dark-blue
    borderRadius: 9999, // rounded-full
    marginBottom: 20,
    width: 240,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  orText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  signUpTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  signUpText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    textAlign: "center",
  },
  signUpLink: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: "#E11D48",
    textDecorationLine: "underline",
    paddingTop: 4,
  },
  iconButton: {
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    marginHorizontal: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});
