import { UserButton } from '@clerk/nextjs';
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-base-100 sticky top-0 z-30 shadow-md">
        <div className="navbar container mx-auto px-4">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" /> Panel
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/clients" className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" /> Clientes
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/plans" className="flex items-center gap-2">
                    <ClipboardDocumentListIcon className="h-4 w-4" /> Planes
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/dashboard" className="btn btn-ghost text-xl normal-case">
              <span className="text-primary font-bold">Fitness</span>Admin
            </Link>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-2">
                <div className="hidden items-center md:flex">
                  <span className="mr-2 text-sm">Administrador</span>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="container mx-auto mt-4 flex flex-1 gap-4 px-4">
        {/* Sidebar - hidden on mobile */}
        <aside className="bg-base-100 rounded-box sticky top-24 hidden h-fit w-64 shadow-lg lg:block">
          <div className="p-4">
            <h2 className="text-primary mb-4 text-xl font-bold">Navegación</h2>
            <ul className="menu bg-base-100 w-full gap-1 p-0">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:bg-primary/10 active:bg-primary/20 flex items-center gap-2">
                  <HomeIcon className="h-5 w-5" />
                  Panel
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/clients"
                  className="hover:bg-primary/10 active:bg-primary/20 flex items-center gap-2">
                  <UsersIcon className="h-5 w-5" />
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/plans"
                  className="hover:bg-primary/10 active:bg-primary/20 flex items-center gap-2">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                  Planes
                </Link>
              </li>
              <li className="mt-4">
                <h3 className="menu-title text-base-content/60 text-xs uppercase">Analíticas</h3>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:bg-primary/10 active:bg-primary/20 flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5" />
                  Ingresos
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="bg-base-100 rounded-box mb-8 flex-1 p-6 shadow-lg">{children}</main>
      </div>

      {/* Footer */}
      <footer className="footer footer-center bg-base-300 text-base-content mt-auto p-4">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - Todos los derechos reservados por Fitness
            Admin
          </p>
        </div>
      </footer>
    </div>
  );
}
