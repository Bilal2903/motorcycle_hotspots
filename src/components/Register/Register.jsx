import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../config/firebase";

export default function Register() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async () => {
    if (email && password && displayName) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: displayName });
        navigation.navigate("Home");
      } catch (err) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("This e-mail is already in use");
            break;
          case "auth/invalid-email":
            setError("Invalid e-mail adress");
            break;
          case "auth/weak-password":
            setError("Please create an password with at least 6 characters");
            break;
          default:
            setError("There has been an error, please try again");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>

      <Animated.View
        entering={FadeInDown.delay(200).duration(3000).springify()}
      >
        <Text style={styles.title}>Username</Text>
        <View style={styles.inputContainer}>
          <Image
            style={{ width: 16, height: 16, marginRight: 12 }}
            source={require("../../../assets/profile-full.png")}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder=""
            value={displayName}
            onChangeText={(value) => setDisplayName(value)}
          />
        </View>
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
        <TouchableOpacity style={styles.button} onPress={handlesubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
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
    color: "#4B5563",
    borderRadius: 8,
    borderColor: "#E5E7EB",
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
    backgroundColor: "#1E3A8A",
    borderRadius: 9999,
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