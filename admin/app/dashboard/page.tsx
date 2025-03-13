import {
  BanknotesIcon,
  UserPlusIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import ThemeTest from '@/components/ThemeTest';
import { getMockRevenueData } from '@/lib/stripe';

export default async function Dashboard() {
  // In a real app, you would fetch this data from Stripe
  // For MVP, we'll use mock data
  const revenueData = getMockRevenueData();

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">Resumen del Panel</h1>
        <div className="stats bg-primary text-primary-content shadow">
          <div className="stat">
            <div className="stat-title text-primary-content/80">Fecha Actual</div>
            <div className="stat-value text-lg">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Test */}
      <div className="mb-8">
        <ThemeTest />
      </div>

      {/* Revenue Overview Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="card bg-base-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-base-content/70">Ingresos Totales</h2>
                <p className="mt-2 text-3xl font-bold">
                  ${revenueData.totalRevenue.toLocaleString()}
                </p>
                <p className="text-base-content/60 mt-1 text-sm">Ingresos totales</p>
              </div>
              <div className="bg-primary/10 rounded-full p-3">
                <BanknotesIcon className="text-primary h-8 w-8" />
              </div>
            </div>
            <div className="mt-4">
              <div className="badge badge-primary">+12% desde el mes pasado</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-base-content/70">Nuevas Suscripciones</h2>
                <p className="mt-2 text-3xl font-bold">{revenueData.newSubscriptions}</p>
                <p className="text-base-content/60 mt-1 text-sm">Este mes</p>
              </div>
              <div className="bg-secondary/10 rounded-full p-3">
                <UserPlusIcon className="text-secondary h-8 w-8" />
              </div>
            </div>
            <div className="mt-4">
              <div className="badge badge-secondary">+5 nuevas esta semana</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-base-content/70">Cancelaciones</h2>
                <p className="mt-2 text-3xl font-bold">{revenueData.churn}</p>
                <p className="text-base-content/60 mt-1 text-sm">Este mes</p>
              </div>
              <div className="bg-error/10 rounded-full p-3">
                <ArrowTrendingDownIcon className="text-error h-8 w-8" />
              </div>
            </div>
            <div className="mt-4">
              <div className="badge badge-error">-2% desde el mes pasado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="card bg-base-100 mb-8 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4 text-xl">Actividad Reciente</h2>
          <div className="overflow-x-auto">
            <table className="table-zebra table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Actividad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{new Date(Date.now() - 1000 * 60 * 60 * 2).toLocaleDateString('es-ES')}</td>
                  <td>Juan Pérez</td>
                  <td>Suscripción Renovada</td>
                  <td>
                    <div className="badge badge-success">Completado</div>
                  </td>
                </tr>
                <tr>
                  <td>{new Date(Date.now() - 1000 * 60 * 60 * 24).toLocaleDateString('es-ES')}</td>
                  <td>María García</td>
                  <td>Asignación de Plan</td>
                  <td>
                    <div className="badge badge-success">Completado</div>
                  </td>
                </tr>
                <tr>
                  <td>{new Date(Date.now() - 1000 * 60 * 60 * 48).toLocaleDateString('es-ES')}</td>
                  <td>Carlos Rodríguez</td>
                  <td>Pago Fallido</td>
                  <td>
                    <div className="badge badge-error">Fallido</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold">Acciones Rápidas</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="card-body">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-lg p-4">
                <UsersIcon className="text-primary h-10 w-10" />
              </div>
              <div>
                <h2 className="card-title">Gestionar Clientes</h2>
                <p className="py-2">
                  Ver y gestionar tu lista de clientes, asignar planes y seguir el estado de las
                  suscripciones.
                </p>
                <div className="card-actions mt-4">
                  <Link href="/dashboard/clients" className="btn btn-primary">
                    Ir a Clientes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="card-body">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 rounded-lg p-4">
                <ClipboardDocumentListIcon className="text-secondary h-10 w-10" />
              </div>
              <div>
                <h2 className="card-title">Gestionar Planes</h2>
                <p className="py-2">
                  Crear y editar planes de entrenamiento y nutrición para asignar a tus clientes.
                </p>
                <div className="card-actions mt-4">
                  <Link href="/dashboard/plans" className="btn btn-primary">
                    Ir a Planes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
