import { User } from '@/types/model';
import { Button } from './ui/button';

export function ProfileView({ user, onEdit }: { user: User; onEdit: () => void }) {
  return (
    <div className="space-y-3">
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>

      <Button onClick={onEdit}>Edit Profile</Button>
    </div>
  );
}
