
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'driver' | 'supervisor';
  companyId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'driver' | 'supervisor') => Promise<void>;
  logout: () => void;
  register: (companyData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'driver' | 'supervisor') => {
    // Simulación de login
    const mockUser: User = {
      id: '1',
      name: role === 'driver' ? 'Juan Pérez' : 'María González',
      email,
      role,
      companyId: 'company1'
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (companyData: any) => {
    // Simulación de registro
    console.log('Registrando empresa:', companyData);
  };

  const value = {
    user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
