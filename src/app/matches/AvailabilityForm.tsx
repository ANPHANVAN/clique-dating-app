'use client';

import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  onSave: (date: string, start: number, end: number) => void;
}

export default function AvailabilityForm({ onSave }: Props) {
  const [date, setDate] = useState('');
  const [start, setStart] = useState(9);
  const [end, setEnd] = useState(10);

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 21); // 3 weeks

    if (selectedDate < today) {
      toast.error('Không thể chọn ngày trong quá khứ');
      return;
    }

    if (selectedDate > maxDate) {
      toast.error('Chỉ được chọn trong 3 tuần tới');
      return;
    }

    setDate(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(date, start, end);
      }}
      className="space-y-2 border p-4 rounded-lg"
    >
      <Input required type="date" value={date} onChange={handleChangeDate} />

      <div className="flex gap-2">
        <Input
          required
          type="number"
          min={0}
          max={23}
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
        />
        <Input required type="number" min={0} max={23} value={end} onChange={(e) => setEnd(Number(e.target.value))} />
      </div>

      <Button className="w-full" type="submit">
        Save Availability
      </Button>
    </form>
  );
}
