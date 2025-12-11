import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

const STORAGE_KEY = 'fitness-auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.get('/users', {
      params: { email, password },
    });
    const found = res.data?.[0];
    if (!found) {
      throw new Error('Invalid email or password');
    }
    setUser(found);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return found;
  };

  const register = async ({ name, email, password }) => {
    const existing = await api.get('/users', { params: { email } });
    if (existing.data && existing.data.length > 0) {
      throw new Error('An account with this email already exists');
    }

    const res = await api.post('/users', {
      name,
      email,
      password,
    });

    const created = res.data;
    setUser(created);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    return created;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
