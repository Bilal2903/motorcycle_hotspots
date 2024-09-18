import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../../config/firebase";

export default function AccountScreen() {
  const user = auth.currentUser;
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [message, setMessage] = useState("");
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleFormSubmit = () => {
    console.log("Naam:", name);
    console.log("Email:", email);
    console.log("Bericht:", message);
    setShowSupportModal(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSaveSettings = () => {
    if (newName !== name || newEmail !== email) {
      updateProfile(auth.currentUser, {
        displayName: newName,
      })
        .then(() => {
          console.log("Profile updated successfully!");
          setName(newName);
          setEmail(newEmail);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
    setShowSettingsModal(false);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, { fontFamily: "Montserrat_700Bold" }]}>
            Account
          </Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require("../../../assets/RollingShoot.jpg")}
          />
          <View style={styles.profileTextContainer}>
            <Text style={[styles.profileText, { fontFamily: "Montserrat_700Bold" }]}>
              {name}
            </Text>
            <Text style={[styles.profileText, { fontFamily: "Montserrat_400Regular" }]}>
              {email}
            </Text>
          </View>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowSupportModal(true)}
          >
            <Text style={[styles.optionText, { fontFamily: "Montserrat_700Bold" }]}>
              Contact Support
            </Text>
            <Image style={styles.optionIcon} source={require("../../../assets/right.png")} />
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowSettingsModal(true)}
          >
            <Text style={[styles.optionText, { fontFamily: "Montserrat_700Bold" }]}>
              Settings
            </Text>
            <Image style={styles.optionIcon} source={require("../../../assets/right.png")} />
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Text style={[styles.optionText, { fontFamily: "Montserrat_700Bold" }]}>
              Sign out
            </Text>
            <Image style={styles.optionIcon} source={require("../../../assets/right.png")} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showSupportModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Contact Support</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Message"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setShowSupportModal(false)}>
                <Text style={styles.closeButton}>Sluiten</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                <Text style={styles.submitButtonText}>Verzenden</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showSettingsModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Instellingen</Text>
            <Text style={styles.inputLabel}>Wijzig Naam</Text>
            <TextInput
              style={styles.input}
              placeholder="Voer je nieuwe naam in"
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />
            <Text style={styles.inputLabel}>Wijzig Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Voer je nieuwe e-mail in"
              value={newEmail}
              onChangeText={(text) => setNewEmail(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
                <Text style={styles.closeButton}>Sluiten</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSaveSettings}>
                <Text style={styles.submitButtonText}>Opslaan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#e2e8f0",
    height: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    paddingTop: 24,
    paddingLeft: 24,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    paddingTop: 15,
    fontSize: 16,
    color: "blue",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});