'use client';

import { useAppContext } from '@/context/AppContext';
import { CreateProfileForm } from '@/components/CreateProfileForm';
import { useState } from 'react';
import { User } from '@/types/model';
import { ProfileView } from '@/components/ProfileView';
import { EditProfileForm } from '@/components/EditProfileForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { modelState, setModelState } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);

  if (!modelState.currentUser) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">You not login</h1>
        <Link href="/login">
          <Button>Please Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      {!modelState.currentUser && (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}

      {isEditing ? (
        <EditProfileForm
          user={modelState.currentUser}
          onSave={(updatedUser) => {
            setModelState((prev) => ({
              ...prev,
              currentUser: updatedUser,
              users: prev.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
            }));
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <ProfileView user={modelState.currentUser} onEdit={() => setIsEditing(true)} />
        </>
      )}
    </div>
  );
}
