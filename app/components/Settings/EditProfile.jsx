// EditProfile.jsx
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const EditProfile = () => {
  const { user, email, username } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState(username || "");
  const [newEmail, setNewEmail] = useState(email || "");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please grant camera roll permissions.");
      return;
    }

    // Open Image Picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0];
      setSelectedImage(pickedImage);
    }
  };

  const handleUpdateProfile = async () => {
    if (!newUsername || !newEmail) {
      Alert.alert("Validation Error", "Username and Email are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("username", newUsername);
    formData.append("email", newEmail);
    if (password) {
      formData.append("password", password);
    }

    if (selectedImage) {
      const uriParts = selectedImage.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("profile_image", {
        uri: selectedImage.uri,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.post(
        "http://backend.nepalgadgetstore.com/editprofile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user}`,
          },
        }
      );
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Update profile failed:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageText}>Pick Profile Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Username"
        value={newUsername}
        onChangeText={setNewUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="New Password (optional)"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Update Profile" onPress={handleUpdateProfile} />
      )}
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  imageText: {
    textAlign: "center",
    color: "#555",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
