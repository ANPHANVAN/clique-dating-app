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
  currentUser: {
    id: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
    name: "user1",
    age: 20,
    gender: "male",
    bio: "login by user1@gmail.com",
    email: "user1@gmail.com",
  },

  users: [
    {
      id: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      name: "user1",
      age: 20,
      gender: "male",
      bio: "login by user1@gmail.com",
      email: "user1@gmail.com",
    },
    {
      id: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
      name: "user2",
      age: 20,
      gender: "female",
      bio: "login by user2@gmail.com",
      email: "user2@gmail.com",
    },
    {
      id: "3d097ca8-ace9-4f5c-91ee-65111ed843a7",
      name: "user3",
      age: 23,
      gender: "male",
      bio: "login by user3@gmail.com",
      email: "user3@gmail.com",
    },
    {
      id: "b7df1817-4ba5-4588-a272-934a8d642e9a",
      name: "user4",
      age: 21,
      gender: "female",
      bio: "login by user4@gmail.com",
      email: "user4@gmail.com",
    },
  ],

  likes: [
    {
      id: "79393805-c062-4032-a7f1-91285d501e7e",
      fromUserId: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      toUserId: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
    },
    {
      id: "5b7e08d0-957d-4ee7-8b3d-e5b67ee97bc2",
      fromUserId: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      toUserId: "3d097ca8-ace9-4f5c-91ee-65111ed843a7",
    },
    {
      id: "45b0b68b-b8cc-4c75-9c42-4dc01fac88ac",
      fromUserId: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
      toUserId: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
    },
    {
      id: "0ab9e3fe-8037-4309-873d-df1b79021f46",
      fromUserId: "3d097ca8-ace9-4f5c-91ee-65111ed843a7",
      toUserId: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
    },
  ],

  matches: [
    {
      id: "3f9e4283-fad6-44e8-929f-ba50488f039c",
      userA: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
      userB: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      matchedAt: new Date("2026-02-21T03:10:26.064Z"),
    },
    {
      id: "92ef8247-d7e8-47ed-bcc1-c7948730339e",
      userA: "3d097ca8-ace9-4f5c-91ee-65111ed843a7",
      userB: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      matchedAt: new Date("2026-02-21T03:11:34.737Z"),
    },
  ],

  availabilities: [
    {
      id: "28c0232a-b0ce-46a8-8be5-6c0ce509c122",
      userId: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
      date: "2026-02-28",
      start: 9,
      end: 22,
    },
    {
      id: "b653324f-b219-4cfd-8a42-a1182cc944a2",
      userId: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
      date: "2026-03-01",
      start: 9,
      end: 22,
    },
    {
      id: "1c7c25ba-d214-460d-aa8c-84ce1caad1bb",
      userId: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      date: "2026-02-28",
      start: 16,
      end: 18,
    },
  ],

  datings: [
    {
      id: "20e7ea56-24e1-4329-982c-553d688215ae",
      matchId: "3f9e4283-fad6-44e8-929f-ba50488f039c",
      userA: "c5cb6982-25bf-4d41-ab4e-9f95f674f283",
      userB: "c14d6a00-560b-4ae2-af36-afd0f4cd7642",
      dateAt: new Date("2026-02-28T09:00:00.000Z"),
      location: "random coffee",
    },
  ],
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
