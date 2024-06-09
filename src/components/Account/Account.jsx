import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

export default function AccountScreen() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text
            style={[styles.headerText, { fontFamily: "Montserrat_700Bold" }]}
          >
            Account
          </Text>
        </View>

        <View style={styles.profileContainer}>
          <View>
            <Image
              style={styles.profileImage}
              source={require("../../../assets/RollingShoot.jpg")}
            />
          </View>

          <View style={styles.profileTextContainer}>
            <Text
              style={[styles.profileText, { fontFamily: "Montserrat_700Bold" }]}
            >
              {auth.currentUser.displayName}
            </Text>

            <Text
              style={[
                styles.profileText,
                { fontFamily: "Montserrat_400Regular" },
              ]}
            >
              {auth.currentUser.email}
            </Text>
          </View>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text
              style={[styles.optionText, { fontFamily: "Montserrat_700Bold" }]}
            >
              Contact Support
            </Text>

            <Image
              style={styles.optionIcon}
              source={require("../../../assets/right.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text
              style={[styles.optionText, { fontFamily: "Montserrat_700Bold" }]}
            >
              Settings
            </Text>

            <Image
              style={styles.optionIcon}
              source={require("../../../assets/right.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Text
              style={[styles.optionText, { fontFamily: "Montserrat_700Bold" }]}
            >
              Sign out
            </Text>

            <Image
              style={styles.optionIcon}
              source={require("../../../assets/right.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsHeaderContainer}>
          <Text
            style={[
              styles.cardsHeaderText,
              { fontFamily: "Montserrat_700Bold" },
            ]}
          >
            Last Ride
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <ScrollView>
            <View style={styles.card}>
              <Text style={styles.cardText}>Rit 1</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Rit 2</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Rit 3</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#f7fafc",
    height: "100%",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    paddingTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
  },
  headerText: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 0,
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 96,
    height: 96,
  },
  profileTextContainer: {
    flexWrap: "wrap",
    paddingLeft: 32,
  },
  profileText: {
    fontSize: 16,
  },
  optionContainer: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  cardsHeaderContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  cardsHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cardContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
});
