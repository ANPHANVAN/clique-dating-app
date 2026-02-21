'use client';

import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export function Logout() {
  const { setModelState } = useAppContext();
  const router = useRouter();

  const deleteToken = () => {
    setModelState((prev) => ({
      ...prev,
      currentUser: null,
    }));
  };

  const navigationToLogin = () => {
    router.push('/login');
  };

  const logout = () => {
    deleteToken();
    navigationToLogin();
  };

  return <Button onClick={logout}>Logout</Button>;
}
