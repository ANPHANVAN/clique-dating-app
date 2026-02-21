'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  onSave: (date: string, start: number, end: number) => void;
}

export default function AvailabilityForm({ onSave }: Props) {
  const [date, setDate] = useState('');
  const [start, setStart] = useState(9);
  const [end, setEnd] = useState(10);

  return (
    <div className="space-y-2 border p-4 rounded-lg">
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <div className="flex gap-2">
        <Input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
        <Input type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} />
      </div>

      <Button className="w-full" onClick={() => onSave(date, start, end)}>
        Save Availability
      </Button>
    </div>
  );
}
