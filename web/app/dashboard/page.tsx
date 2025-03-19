import Link from "next/link";

export default function DashboardPage() {
  // Dummy client data
  const clients = [
    { id: 1, name: "John Doe", age: 28, goal: "Weight Loss", lastSession: "2023-05-15" },
    { id: 2, name: "Jane Smith", age: 35, goal: "Muscle Gain", lastSession: "2023-05-12" },
    { id: 3, name: "Mike Johnson", age: 42, goal: "Cardio", lastSession: "2023-05-10" },
    { id: 4, name: "Sarah Williams", age: 30, goal: "Flexibility", lastSession: "2023-05-08" },
    { id: 5, name: "Alex Brown", age: 25, goal: "Overall Fitness", lastSession: "2023-05-14" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <button className="btn btn-primary">
          Add New Client
        </button>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Name</th>
                  <th>Age</th>
                  <th>Goal</th>
                  <th>Last Session</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="font-bold">{client.name}</div>
                    </td>
                    <td>{client.age}</td>
                    <td>{client.goal}</td>
                    <td>{client.lastSession}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/clients/${client.id}`} className="btn btn-xs btn-outline">
                          View
                        </Link>
                        <button className="btn btn-xs btn-outline btn-warning">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <p>No recent activity to display.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Upcoming Sessions</h2>
            <p>No upcoming sessions to display.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Client Stats</h2>
            <p>5 active clients</p>
          </div>
        </div>
      </div>
    </div>
  );
} 