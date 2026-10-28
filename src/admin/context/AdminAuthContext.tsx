import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../../api';

interface AdminUser { email: string; fullName: string; role: string; token: string; }
interface AuthCtx { user: AdminUser | null; login: (email: string, password: string) => Promise<void>; logout: () => void; }

const AuthContext = createContext<AuthCtx | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem('medgem_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const { token, email: e, fullName, role } = res.data.data;
    const u = { token, email: e, fullName, role };
    localStorage.setItem('medgem_token', token);
    localStorage.setItem('medgem_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('medgem_token');
    localStorage.removeItem('medgem_user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAdminAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
