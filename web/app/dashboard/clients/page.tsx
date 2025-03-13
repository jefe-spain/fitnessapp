import ClientTable from '@/components/ClientTable';
import { supabase } from '@/lib/supabase';
import type { Client } from '@/lib/supabase';

export default async function ClientsPage() {
  // In a real app, you would fetch this data from Supabase
  // For MVP, we'll use mock data
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      registration_date: '2023-01-15',
      subscription_status: 'Active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      registration_date: '2023-02-20',
      subscription_status: 'Active'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      registration_date: '2023-03-10',
      subscription_status: 'Expired'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      registration_date: '2023-04-05',
      subscription_status: 'Cancelled'
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      registration_date: '2023-05-12',
      subscription_status: 'Active'
    }
  ];

  // In a real app, you would fetch plans from Supabase
  const mockPlans = [
    { id: '1', name: 'Beginner Strength', type: 'Workout' },
    { id: '2', name: 'Intermediate Cardio', type: 'Workout' },
    { id: '3', name: 'Advanced HIIT', type: 'Workout' },
    { id: '4', name: 'Weight Loss Meal Plan', type: 'Nutrition' },
    { id: '5', name: 'Muscle Building Diet', type: 'Nutrition' }
  ];

  // In a real app, you would fetch client-plan relationships from Supabase
  const mockClientPlans = [
    { client_id: '1', plan_id: '1' },
    { client_id: '1', plan_id: '4' },
    { client_id: '2', plan_id: '2' },
    { client_id: '3', plan_id: '3' },
    { client_id: '5', plan_id: '5' }
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button className="btn btn-primary">Add New Client</button>
      </div>

      <ClientTable clients={mockClients} plans={mockPlans} clientPlans={mockClientPlans} />
    </div>
  );
}
