import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartItem({ item, addToCart, removeFromCart }) {
  // Check if item or product_img is undefined and provide a fallback for missing image
  if (!item) {
    return <Text>Item not available</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Image with fallback */}
      <Image
        source={{ uri: item.product_img || 'https://via.placeholder.com/80' }} 
        style={styles.image}
      />

      <View style={styles.details}>
        {/* Ensure product name and price exist before rendering */}
        <Text style={styles.name}>{item.title || 'No name available'}</Text>
        <Text style={styles.price}>Rs. {item.price || '0.00'}</Text>

        <View style={styles.quantityContainer}>
          {/* Remove from cart button */}
          <Pressable style={styles.button} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>

          {/* Item quantity */}
          <Text style={styles.quantityText}>{item.quantity || 0}</Text>

          {/* Add to cart button */}
          <Pressable style={styles.button} onPress={() => addToCart(item)}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E91E63",
    padding: 6,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
