import { Slot, Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
      <Stack>
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>
    </AuthProvider>
  );
}
