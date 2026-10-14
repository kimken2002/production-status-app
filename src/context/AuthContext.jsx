import { createContext, useContext, useEffect, useState } from "react";
import { useAppData } from "./AppDataContext";

const AuthContext = createContext(null);
const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { employees } = useAppData();

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = ({ id }) => {
    if (!id) {
      return {
        success: false,
        message: "IDを入力してください",
      };
    }

    if (!/^\d{6}$/.test(id)) {
      return {
        success: false,
        message: "IDは6桁の数字で入力してください",
      };
    }

    const foundEmployee = employees.find((employee) => employee.id === id);

    if (!foundEmployee) {
      return {
        success: false,
        message: "登録必要です",
      };
    }

    const loginUser = {
      id: foundEmployee.id,
      name: foundEmployee.name,
      department: foundEmployee.department,
      role: foundEmployee.department === "管理部" ? "admin" : "producer",
    };

    setUser(loginUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loginUser));

    return {
      success: true,
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
