'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginPage() {
  const { modelState, setModelState } = useAppContext();
  const [email, setEmail] = useState('');
  const router = useRouter();

  const login = (emailLogin: string) => {
    const userData = modelState.users.find((user) => user.email === emailLogin);
    if (!userData) return;
    // TODO alert something

    setModelState((prev) => ({
      ...prev,
      currentUser: userData,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    login(email);
    router.push('/');
  };
  return (
    <form className="flex justify-center items-center h-2/3" onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction>
            <Link href="/register">
              <Button type="button" variant="link">
                Register
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default LoginPage;
