"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ClientSidebar = () => {
  // Get current path to highlight active menu item
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Clients', path: '/dashboard/clients' },
    { name: 'Workouts', path: '/dashboard/workouts' },
    { name: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-base-100 shadow-md">
      <ul className="menu p-4 text-base-content">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              href={item.path}
              className={`${pathname === item.path ? 'active bg-primary text-primary-content' : ''}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li className="mt-auto">
          <SignOutButton>
            <button className="btn btn-outline btn-error btn-sm mt-4 w-full">
              Logout
            </button>
          </SignOutButton>
        </li>
      </ul>
    </aside>
  );
}; 