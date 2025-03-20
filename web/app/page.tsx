import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();

  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }
  
  // Otherwise, redirect to sign-in page
  redirect('/sign-in');
}
