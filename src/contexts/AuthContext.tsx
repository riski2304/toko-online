import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  whatsapp: string;
  address: string;
  avatar?: string;
  isVerified: boolean;
  balance: number;
  rating: number;
  itemsSold: number;
  tasksCompleted: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (whatsapp: string) => void;
  register: (data: { name: string; whatsapp: string; address: string }) => void;
  logout: () => void;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'palangka_hub_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(userData);
  };

  const login = (whatsapp: string) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const userData = JSON.parse(stored);
      if (userData.whatsapp === whatsapp) {
        setUser(userData);
        return;
      }
    }
    // Demo login - create new user if not found
    const newUser: User = {
      id: crypto.randomUUID(),
      name: 'Pengguna Baru',
      whatsapp,
      address: 'Palangka Raya',
      isVerified: false,
      balance: 0,
      rating: 0,
      itemsSold: 0,
      tasksCompleted: 0,
    };
    saveUser(newUser);
  };

  const register = (data: { name: string; whatsapp: string; address: string }) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      whatsapp: data.whatsapp,
      address: data.address,
      isVerified: false,
      balance: 0,
      rating: 0,
      itemsSold: 0,
      tasksCompleted: 0,
    };
    saveUser(newUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updated = { ...user, balance: user.balance + amount };
      saveUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
