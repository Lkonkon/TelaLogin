import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  userEmail: string | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const storedUser = await AsyncStorage.getItem("@AuthData:user");
      if (storedUser) {
        setUserEmail(storedUser);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string) {
    try {
      await AsyncStorage.setItem("@AuthData:user", email);
      setUserEmail(email);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha ao fazer login");
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("@AuthData:user");
      setUserEmail(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw new Error("Falha ao fazer logout");
    }
  }

  return (
    <AuthContext.Provider value={{ userEmail, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
