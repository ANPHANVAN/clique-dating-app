'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Logout } from './Logout';
import { useAppContext } from '@/context/AppContext';
import { Button } from './ui/button';

const HeaderComponent = () => {
  const { modelState, setModelState } = useAppContext();
  return (
    <header className="bg-blue-100/50 sticky top-0 z-40 flex h-14 items-center justify-between px-3">
      {/* Logo */}
      <div className="flex w-auto max-w-full items-center pr-4">
        <Link href="/" className="w-20 mx-2 text-left text-xl text-black hover:text-blue-300 dark:hover:text-blue-300">
          Clipque83
        </Link>
      </div>

      {/* Tool & Login */}
      <div className="flex items-center justify-start">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/matches">Matches</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/register">Register</Link>
            </NavigationMenuLink>
            {modelState.currentUser ? (
              <>
                <NavigationMenuLink asChild>
                  <Link href="/profile">{modelState.currentUser.name}</Link>
                </NavigationMenuLink>
                <Logout />
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default HeaderComponent;
