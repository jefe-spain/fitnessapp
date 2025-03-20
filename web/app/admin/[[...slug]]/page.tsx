import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const user = await currentUser();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }
  
  // Redirect to the new sign-in page
  redirect("/sign-in");
} 