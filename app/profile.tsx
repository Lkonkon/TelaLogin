import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { router } from "expo-router";
import { useAuth } from "./context/AuthContext";

export default function Profile() {
  const { userEmail } = useAuth();

  function Logout() {
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo, {userEmail || "Usuário"}</Text>
      <Button title="Sair" onPress={Logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 120,
  },
});
