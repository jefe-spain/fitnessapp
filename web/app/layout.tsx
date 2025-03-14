import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitnessAdmin',
  description: 'Fitness administration dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" data-theme="bumblebee" className="h-full">
        <body className={`${inter.className} min-h-full bg-base-200`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
