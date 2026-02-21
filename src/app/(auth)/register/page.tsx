'use client';

import { CreateProfileForm } from '@/components/CreateProfileForm';
import { ProfileCard } from '@/components/ProfileCard';
import { User } from '@/types/model';
import { useAppContext } from '@/context/AppContext';

export default function App() {
  const { modelState, setModelState } = useAppContext();

  const handleCreate = (user: User) => {
    setModelState((prev) => ({
      ...prev,
      users: [...prev.users, user],
    }));
  };

  return (
    <div className="flex justify-center items-center ">
      <CreateProfileForm onCreate={handleCreate} />
    </div>
  );
}
