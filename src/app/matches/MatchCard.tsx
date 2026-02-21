'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AvailabilityForm from './AvailabilityForm';
import { Match, User, Dating, Availability } from '@/types/model';
import { useAppContext } from '@/context/AppContext';

interface Props {
  match: Match;
  otherUser: User;
  dating?: Dating;
  overlap: { date: string; start: number; end: number } | null;
  onAddAvailability: (date: string, start: number, end: number) => void;
}

export default function MatchCard({ match, otherUser, dating, overlap, onAddAvailability }: Props) {
  const { modelState, setModelState } = useAppContext();
  const otherPicktime: Availability[] = modelState.availabilities.filter(
    (availability) => availability.userId === otherUser.id
  );

  const youPicktime: Availability[] = modelState.availabilities.filter(
    (availability) => availability.userId === modelState.currentUser?.id
  );

  return (
    <Card className={`transition-all ${dating ? 'border-2 border-pink-500 shadow-lg' : ''}`}>
      <CardHeader>
        <CardTitle>
          {otherUser.name}, {otherUser.age}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{otherUser.bio}</p>
        <div className="grid grid-cols-2">
          <div>
            {otherUser.name} pick time:
            {otherPicktime.map((time) => {
              return (
                <p key={time.id}>{`${new Date(time.date).toLocaleDateString()} from ${time.start} to ${time.end}`}</p>
              );
            })}
          </div>

          <div>
            You pick time:
            {youPicktime.map((time) => {
              return (
                <p key={time.id}>{`${new Date(time.date).toLocaleDateString()} from ${time.start} to ${time.end}`}</p>
              );
            })}
          </div>
        </div>

        {!dating && <AvailabilityForm onSave={onAddAvailability} />}

        {dating && (
          <div className="text-green-600 font-semibold">❤️ Date at {new Date(dating.dateAt).toLocaleString()}</div>
        )}

        {!dating && overlap && <div className="text-blue-600 text-sm">⏳ Waiting for the other side...</div>}
      </CardContent>
    </Card>
  );
}
