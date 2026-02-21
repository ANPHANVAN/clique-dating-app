'use client';

import { ProfileCard } from '@/components/ProfileCard';
import { useAppContext } from '@/context/AppContext';
import { Like } from '@/types/model';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';

export default function App() {
  const { modelState, setModelState } = useAppContext();
  const users = modelState.users.filter((user) => user.id !== modelState.currentUser?.id);

  const handleLike = (targetId: string) => {
    const currentUserId = modelState.currentUser?.id;

    if (!currentUserId) {
      toast.error('Need to login');
      return;
    }

    if (currentUserId === targetId) {
      toast.error('Can’t like yourself');
      return;
    }

    const alreadyLiked = modelState.likes.some(
      (like) => like.fromUserId === currentUserId && like.toUserId === targetId
    );
    if (alreadyLiked) {
      toast.error('Were like this user');
      return;
    }

    // Check matches
    const isMatches: boolean = modelState.likes.some(
      (like) => like.fromUserId === targetId && like.toUserId === currentUserId
    );

    const newLike: Like = {
      id: uuid(),
      fromUserId: currentUserId,
      toUserId: targetId,
    };

    toast.success('Like Success');

    // save like and matches
    setModelState((prev) => {
      const updatedLikes = [...prev.likes, newLike];

      if (isMatches) {
        const newMatch = {
          id: uuid(),
          userA: currentUserId,
          userB: targetId,
          matchedAt: new Date(),
        };

        toast.info('It’s a Match');

        return {
          ...prev,
          likes: updatedLikes,
          matches: [...prev.matches, newMatch],
        };
      }

      return {
        ...prev,
        likes: updatedLikes,
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <ProfileCard key={user.id} user={user} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
