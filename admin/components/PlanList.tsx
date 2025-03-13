'use client';

import type { Plan } from '@/lib/supabase';

type PlanListProps = {
  plans: Plan[];
};

export default function PlanList({ plans }: PlanListProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table-zebra table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td>
                    <div>
                      <div className="font-bold">{plan.name}</div>
                      {plan.description && (
                        <div className="text-sm opacity-70">{plan.description}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        plan.type === 'Workout' ? 'badge-primary' : 'badge-secondary'
                      }`}>
                      {plan.type}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-ghost">Edit</button>
                      <button className="btn btn-sm btn-ghost text-error">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {plans.length === 0 && (
          <div className="py-4 text-center">
            <p className="text-gray-500">No plans created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
