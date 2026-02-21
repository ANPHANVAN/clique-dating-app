'use client';

import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export default function ToasterProvider({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
