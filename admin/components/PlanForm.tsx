'use client';

import { useState } from 'react';

export default function PlanForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Workout' as 'Workout' | 'Nutrition',
    description: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would send this data to Supabase
    console.log('Submitting plan:', formData);

    // Reset form
    setFormData({
      name: '',
      type: 'Workout',
      description: ''
    });

    // Show success message
    alert('Plan created successfully!');
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Plan Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Beginner Strength"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Plan Type</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
              required>
              <option value="Workout">Workout</option>
              <option value="Nutrition">Nutrition</option>
            </select>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Description (Optional)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the plan..."
              className="textarea textarea-bordered h-24"
            />
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-primary">
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
