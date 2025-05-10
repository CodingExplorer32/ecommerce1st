// app/contact.jsx
import React from "react";
import { View, Text, StyleSheet, Pressable, Linking, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ContactUs() {
  const email = "support@hamroshop.com";
  const phone = "+977-9800000000";

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      <View style={styles.contactItem}>
        <Ionicons name="mail-outline" size={24} color="#E91E63" style={styles.icon} />
        <Pressable onPress={handleEmailPress}>
          <Text style={styles.linkText}>{email}</Text>
        </Pressable>
      </View>

      <View style={styles.contactItem}>
        <Ionicons name="call-outline" size={24} color="#E91E63" style={styles.icon} />
        <Pressable onPress={handlePhonePress}>
          <Text style={styles.linkText}>{phone}</Text>
        </Pressable>
      </View>

      <Text style={styles.footerText}>We are happy to assist you anytime!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF3E2",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  linkText: {
    fontSize: 18,
    color: "#E91E63",
    textDecorationLine: "underline",
  },
  footerText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
});
