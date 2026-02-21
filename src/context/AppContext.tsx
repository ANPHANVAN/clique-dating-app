'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AppModel } from '../types/model';

interface AppContextType {
  modelState: AppModel;
  setModelState: React.Dispatch<React.SetStateAction<AppModel>>;
}

const STORAGE_KEY = 'mini-dating-app';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppModel = {
  currentUser: null,
  users: [],
  likes: [],
  matches: [],
  availabilities: [],
  datings: [],
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [modelState, setModelState] = useState<AppModel>(() => {
    if (typeof window === 'undefined') return initialState;

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modelState));
  }, [modelState]);

  return <AppContext.Provider value={{ modelState, setModelState }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
