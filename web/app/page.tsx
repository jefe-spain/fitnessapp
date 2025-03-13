import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="from-base-200 to-base-100 min-h-screen bg-gradient-to-b">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <div className="px-4">
            <span className="text-xl font-bold">
              <span className="text-primary">Fitness</span>Admin
            </span>
          </div>
        </div>
        <div className="navbar-end">
          <SignedIn>
            <Link href="/dashboard" className="btn btn-ghost">
              Panel
            </Link>
          </SignedIn>
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-center gap-12 px-4 py-16 lg:flex-row">
        {/* Left side - Hero content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="mb-4 text-5xl font-bold">
            <span className="text-primary">Panel</span> de Administración de Fitness
          </h1>
          <p className="max-w-2xl py-6 text-lg">
            Gestiona tus clientes de fitness, asigna planes de entrenamiento, controla la nutrición
            y monitoriza los ingresos en un solo lugar. La solución completa para profesionales del
            fitness.
          </p>

          <SignedIn>
            <div className="mt-6">
              <Link href="/dashboard" className="btn btn-primary btn-lg">
                Ir al Panel
              </Link>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="card bg-base-100 mx-auto mt-8 max-w-md shadow-xl lg:mx-0">
              <div className="card-body">
                <h2 className="card-title mx-auto mb-4 text-center">
                  Inicia sesión para continuar
                </h2>
                <SignIn />
              </div>
            </div>
          </SignedOut>
        </div>

        {/* Right side - Image */}
        <div className="flex flex-1 justify-center">
          <div className="relative aspect-square w-full max-w-lg">
            <div className="bg-primary animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full opacity-30 mix-blend-multiply blur-xl filter" />
            <div className="bg-secondary animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full opacity-30 mix-blend-multiply blur-xl filter" />
            <div className="bg-accent animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full opacity-30 mix-blend-multiply blur-xl filter" />
            <div className="relative">
              {/* Replace with your own image or use a placeholder */}
              <div className="bg-base-100 mx-auto flex h-full w-full max-w-md items-center justify-center rounded-lg p-8 shadow-2xl">
                <div className="text-center text-6xl font-bold">
                  <span className="text-primary">Fitness</span>
                  <br />
                  <span>Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center bg-base-300 text-base-content mt-auto p-10">
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
