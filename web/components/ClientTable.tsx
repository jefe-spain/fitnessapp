'use client';

import { useState, useMemo } from 'react';

import type { Client } from '@/lib/supabase';

type Plan = {
  id: string;
  name: string;
  type: 'Workout' | 'Nutrition';
  description?: string;
};

type ClientPlan = {
  client_id: string;
  plan_id: string;
};

type ClientTableProps = {
  clients: Client[];
  plans: Plan[];
  clientPlans: ClientPlan[];
};

export default function ClientTable({ clients, plans, clientPlans }: ClientTableProps) {
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  // Handle sorting
  const handleSort = (field: keyof Client) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get client plans
  const getClientPlans = (clientId: string) => {
    const planIds = clientPlans.filter((cp) => cp.client_id === clientId).map((cp) => cp.plan_id);

    return plans
      .filter((plan) => planIds.includes(plan.id))
      .map((plan) => plan.name)
      .join(', ');
  };

  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = [...clients];

    // Apply active filter if enabled
    if (showActiveOnly) {
      filtered = filtered.filter((client) => client.subscription_status === 'Active');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [clients, sortField, sortDirection, showActiveOnly]);

  // Get sort indicator
  const getSortIndicator = (field: keyof Client) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text mr-2">Show Active Only</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={showActiveOnly}
              onChange={() => setShowActiveOnly(!showActiveOnly)}
            />
          </label>
        </div>

        <div className="text-sm text-gray-500">
          Showing {filteredAndSortedClients.length} of {clients.length} clients
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="cursor-pointer">
                Name {getSortIndicator('name')}
              </th>
              <th onClick={() => handleSort('email')} className="cursor-pointer">
                Email {getSortIndicator('email')}
              </th>
              <th onClick={() => handleSort('registration_date')} className="cursor-pointer">
                Registration Date {getSortIndicator('registration_date')}
              </th>
              <th onClick={() => handleSort('subscription_status')} className="cursor-pointer">
                Status {getSortIndicator('subscription_status')}
              </th>
              <th>Assigned Plans</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedClients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{new Date(client.registration_date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      client.subscription_status === 'Active'
                        ? 'badge-success'
                        : client.subscription_status === 'Expired'
                          ? 'badge-warning'
                          : 'badge-error'
                    }`}>
                    {client.subscription_status}
                  </span>
                </td>
                <td>{getClientPlans(client.id) || 'None'}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-sm btn-ghost">
                      Assign Plan
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      {plans.map((plan) => (
                        <li key={plan.id}>
                          <a>
                            {plan.name} ({plan.type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
