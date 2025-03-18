
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/lib/types";
import { users } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      return true;
    }

    toast({
      title: "Error",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      toast({
        title: "Error",
        description: "Email already in use",
        variant: "destructive",
      });
      return false;
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    // In a real app, we would send this to an API
    // Here we're just simulating by adding to our in-memory array
    users.push(newUser);
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Success",
      description: "Your account has been created",
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
