import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { CartContext } from "../context/CartProvider";
import CartItem from "../components/Cart/CartItem";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    Toast.show({
      type: "success",
      text1: "Checkout Successful",
      text2: "You are now checked out",
    });
    clearCart(); // Clear cart after checkout
  };

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.headerText}>Your Cart</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.productContainer}>
          {cartItems.length === 0 ? (
            <Text style={styles.noProductText}>Your cart is empty </Text>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>Rs. {totalAmount}</Text>
          </View>
          <Pressable style={styles.button} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Proceed to Checkout</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FEF3E2",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  scrollView: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  productContainer: {
    marginTop: 20,
  },
  noProductText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#555",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: "#E91E63",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
