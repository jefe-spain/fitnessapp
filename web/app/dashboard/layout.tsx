import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ReactNode } from "react";
import { ClientSidebar } from "./components/ClientSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await currentUser();
  
  // If user is not authenticated, redirect to admin page
  if (!user) {
    redirect("/admin");
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link href="/dashboard" className="btn btn-ghost text-xl">FitnessApp</Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <UserButton />
          </div>
        </div>
      </nav>
      
      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ClientSidebar />
        
        {/* Main content */}
        <main className="flex-1 p-6 bg-base-200">
          {children}
        </main>
      </div>
    </div>
  );
} 