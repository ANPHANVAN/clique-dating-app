'use client';

import { useAppContext } from '@/context/AppContext';
import MatchCard from './MatchCard';
import { findOverlap, shouldCreateDating } from '@/lib/match';
import { Match } from '@/types/model';
import { toast } from 'sonner';

export default function MatchesPage() {
  const { modelState, setModelState } = useAppContext();
  const { currentUser, matches, users, availabilities, datings } = modelState;

  if (!currentUser) return <div className="p-6">Need to login</div>;

  const myMatches = matches.filter((m) => m.userA === currentUser.id || m.userB === currentUser.id);

  const getOtherUser = (match: Match) => {
    const otherId = match.userA === currentUser.id ? match.userB : match.userA;

    return users.find((u) => u.id === otherId);
  };

  const handleAddAvailability = (matchId: string, date: string, start: number, end: number) => {
    toast.success('Pick availability success');
    const newAvailability = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      date,
      start,
      end,
    };

    const updatedAvailabilities = [...availabilities, newAvailability];

    setModelState((prev) => ({
      ...prev,
      availabilities: updatedAvailabilities,
    }));

    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    const overlap = findOverlap(match, updatedAvailabilities);

    if (overlap && shouldCreateDating(matchId, datings)) {
      const dateAt = new Date(`${overlap.date}T${overlap.start}:00`);
      const newDating = {
        id: crypto.randomUUID(),
        matchId,
        userA: match.userA,
        userB: match.userB,
        dateAt: dateAt,
        location: 'random coffee' as const,
      };

      toast.success(`Hai bạn có date hẹn vào: ${dateAt.toLocaleDateString()}`);
      console.log(`Hai bạn có date hẹn vào: ${dateAt.toLocaleDateString()}`);

      setModelState((prev) => ({
        ...prev,
        datings: [...prev.datings, newDating],
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Matches</h1>

      {myMatches.map((match) => {
        const otherUser = getOtherUser(match);
        if (!otherUser) return null;

        const overlap = findOverlap(match, availabilities);

        const dating = datings.find((d) => d.matchId === match.id);

        return (
          <MatchCard
            key={match.id}
            match={match}
            otherUser={otherUser}
            overlap={overlap}
            dating={dating}
            onAddAvailability={(date, start, end) => handleAddAvailability(match.id, date, start, end)}
          />
        );
      })}
    </div>
  );
}
