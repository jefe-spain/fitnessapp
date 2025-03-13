import PlanForm from '@/components/PlanForm';
import PlanList from '@/components/PlanList';
import type { Plan } from '@/lib/supabase';

export default function PlansPage() {
  // In a real app, you would fetch this data from Supabase
  // For MVP, we'll use mock data
  const mockPlans: Plan[] = [
    {
      id: '1',
      name: 'Beginner Strength',
      type: 'Workout',
      description: 'A basic strength training program for beginners'
    },
    {
      id: '2',
      name: 'Intermediate Cardio',
      type: 'Workout',
      description: 'Cardio workout for intermediate fitness levels'
    },
    {
      id: '3',
      name: 'Advanced HIIT',
      type: 'Workout',
      description: 'High-intensity interval training for advanced users'
    },
    {
      id: '4',
      name: 'Weight Loss Meal Plan',
      type: 'Nutrition',
      description: 'Meal plan designed for weight loss'
    },
    {
      id: '5',
      name: 'Muscle Building Diet',
      type: 'Nutrition',
      description: 'Nutrition plan for muscle growth'
    }
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Plans Management</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Create New Plan</h2>
          <PlanForm />
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Existing Plans</h2>
          <PlanList plans={mockPlans} />
        </div>
      </div>
    </div>
  );
}
