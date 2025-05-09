import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider } from "./context/AuthContext";

// Mantém a tela de splash visível enquanto carregamos recursos
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    // Adicione suas fontes aqui se necessário
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Esconde a tela de splash quando as fontes estiverem carregadas
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Perfil",
            headerShown: true,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
