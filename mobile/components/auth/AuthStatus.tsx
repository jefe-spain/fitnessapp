import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { ReactNode } from 'react';

interface AuthContentProps {
  children: ReactNode;
}

export function SignedInContent({ children }: AuthContentProps) {
  return <SignedIn>{children}</SignedIn>;
}

export function SignedOutContent({ children }: AuthContentProps) {
  return <SignedOut>{children}</SignedOut>;
}

export function useUserInfo() {
  return useUser();
}
