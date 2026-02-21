export interface AppModel {
  currentUser: User | null;
  users: User[];
  likes: Like[];
  matches: Match[];
  availabilities: Availability[];
  datings: Dating[];
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  bio: string;
  email: string;
}

export interface Like {
  id: string;
  fromUserId: string;
  toUserId: string;
}

export interface Match {
  id: string;
  userA: string;
  userB: string;
  matchedAt: Date;
}

export interface Availability {
  id: string;
  userId: string;
  date: string;
  start: number;
  end: number;
}

export interface Dating {
  id: string;
  matchId: string;
  userA: string;
  userB: string;
  dateAt: Date;
  location: 'clique83 branch' | 'random coffee';
}
