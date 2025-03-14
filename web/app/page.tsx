import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            <span className="text-warning">Fitness</span>Admin
          </Link>
        </div>
        <div className="navbar-end">
          <SignedIn>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-warning text-warning-content flex items-center justify-center">
                  <span className="text-lg font-bold">A</span>
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><a>Settings</a></li>
              </ul>
            </div>
          </SignedIn>
        </div>
      </div>

      <main className="flex-grow">
        <div className="hero min-h-[calc(100vh-4rem)]">
          <div className="hero-content flex-col lg:flex-row-reverse gap-8">
            {/* Right side - Image/Illustration */}
            <div className="text-center lg:text-left lg:w-1/2">
              <div className="relative">
                <div className="bg-warning/20 absolute -left-4 top-0 h-72 w-72 rounded-full mix-blend-multiply blur-xl filter" />
                <div className="bg-info/20 absolute -right-4 top-0 h-72 w-72 rounded-full mix-blend-multiply blur-xl filter" />
                <div className="bg-success/20 absolute -bottom-8 left-20 h-72 w-72 rounded-full mix-blend-multiply blur-xl filter" />
                <div className="relative bg-base-100 rounded-box shadow-2xl p-8">
                  <div className="text-center text-6xl font-bold">
                    <span className="text-warning">Fitness</span>
                    <br />
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left side - Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl font-bold">
                <span className="text-warning">Welcome</span> Back
              </h1>
              <p className="py-6 text-lg">
                Your comprehensive solution for managing fitness clients, training plans, and business operations.
              </p>
              
              <SignedIn>
                <Link href="/dashboard" className="btn btn-warning btn-lg">
                  Go to Dashboard
                </Link>
              </SignedIn>

              <SignedOut>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title justify-center mb-4">
                      Sign in to continue
                    </h2>
                    <SignIn />
                  </div>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-100 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link href="/" className="link link-hover">About us</Link>
          <Link href="/" className="link link-hover">Contact</Link>
        </nav> 
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
          </div>
        </nav> 
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by FitnessAdmin</p>
        </aside>
      </footer>
    </div>
  );
}
