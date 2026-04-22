"use client";

import { useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  organization: string;
  deadline: Date;
  link: string;
  createdAt: Date;
}

interface OpportunitiesManagerProps {
  opportunities: Opportunity[];
}

export default function OpportunitiesManager({ opportunities }: OpportunitiesManagerProps) {
  const [opportunitiesList, setOpportunitiesList] = useState(opportunities);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organization: "",
    deadline: "",
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingOpportunity ? `/api/admin/opportunities/${editingOpportunity.id}` : "/api/admin/opportunities";
    const method = editingOpportunity ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedOpportunity = await response.json();
        
        if (editingOpportunity) {
          setOpportunitiesList(prev =>
            prev.map(opp => opp.id === editingOpportunity.id ? updatedOpportunity : opp)
          );
        } else {
          setOpportunitiesList(prev => [updatedOpportunity, ...prev]);
        }

        resetForm();
      }
    } catch (error) {
      console.error("Error saving opportunity:", error);
    }
  };

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setFormData({
      title: opportunity.title,
      description: opportunity.description,
      organization: opportunity.organization,
      deadline: new Date(opportunity.deadline).toISOString().split('T')[0],
      link: opportunity.link,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this opportunity?")) {
      try {
        const response = await fetch(`/api/admin/opportunities/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setOpportunitiesList(prev => prev.filter(opp => opp.id !== id));
        }
      } catch (error) {
        console.error("Error deleting opportunity:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      organization: "",
      deadline: "",
      link: "",
    });
    setEditingOpportunity(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">All Opportunities</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <HiPlus className="h-5 w-5" />
            Add New Opportunity
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingOpportunity ? "Edit Opportunity" : "Add New Opportunity"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link
              </label>
              <input
                type="url"
                required
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingOpportunity ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunitiesList.map((opportunity) => (
              <tr key={opportunity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{opportunity.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{opportunity.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.organization}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(opportunity.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(opportunity)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <HiPencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(opportunity.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {opportunitiesList.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No opportunities found. Create your first opportunity!
          </div>
        )}
      </div>
    </div>
  );
}
