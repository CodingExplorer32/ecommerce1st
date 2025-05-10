import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "expo-router";

const AllCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend.nepalgadgetstore.com/category")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Explore Categories</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {data.map((item) => (
              <TouchableOpacity
                style={styles.card}
                key={item.id}
                activeOpacity={0.9}
              >
                <Link href={`/Screen/SingleCategory/${item.id}`} asChild>
                  <View>
                    <Image
                      source={{
                        uri: `https://backend.nepalgadgetstore.com/${item.category_img}`,
                      }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.category_name}
                    </Text>
                  </View>
                </Link>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f1f3f6",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 15,

    // soft shadow
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
