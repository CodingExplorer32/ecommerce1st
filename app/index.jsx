import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth"; 
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth(); 

  // Notification setup
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });

        const { status } = await Notifications.getPermissionsAsync();
        await AsyncStorage.setItem("notificationPermission", status);

        if (status !== "granted") {
          console.log("Notification permission not granted");
        }
      } catch (error) {
        console.error("Notification error:", error);
      }
    };

    setupNotifications();
  }, []);

  // Redirect based on authentication status
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/(tabs)/"); // Redirect to main tab if user is logged in
      } else {
        router.push("/Screen/Welcome"); // Redirect to Welcome screen if not logged in
      }
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      {/* Show ActivityIndicator while loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#E91E63" />
      ) : (
        <Text>Redirecting...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});
