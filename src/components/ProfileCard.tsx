'use client';

import { User } from '@/types/model';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  user: User;
  onLike: (userId: string) => void;
}

export function ProfileCard({ user, onLike }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-bold">{user.name}</h2>
        <p>{user.age} years old</p>
        <p>{user.bio}</p>

        <Button onClick={() => onLike(user.id)}>Like</Button>
      </CardContent>
    </Card>
  );
}
