import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({ email: "", senha: "" });
  const { login } = useAuth();

  function HandleLogin() {
    try {
      const dados = Usuário.parse({ email, senha });
      setErros({ email: "", senha: "" });
      login(dados.email);
      router.push("/profile");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errosFormatados = { email: "", senha: "" };
        error.errors.forEach((err) => {
          if (err.path[0] === "email") errosFormatados.email = err.message;
          if (err.path[0] === "senha") errosFormatados.senha = err.message;
        });
        setErros(errosFormatados);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}
      <Button title="Entrar" onPress={HandleLogin} />
    </View>
  );
}

const Usuário = z.object({
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .nonempty({ message: "E-mail é obrigatório" })
    .transform((val) => val.toLowerCase()),
  senha: z
    .string()
    .nonempty({ message: "Senha é obrigatória" })
    .refine((val) => val === "123456", { message: "Senha incorreta" }),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 30,
    marginBottom: 120,
  },
  button: {
    marginTop: 20,
  },
  erro: {
    color: "red",
    marginBottom: 10,
    alignSelf: "center",
  },
});
