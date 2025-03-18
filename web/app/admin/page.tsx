import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const user = await currentUser();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }
  
  // If user is not authenticated, show sign-in component
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
        <SignIn />
      </div>
    </div>
  );
} 