import React from "react";

const PriorityFilter = ({ priority, handlePriorityChange }) => {
  return (
    <div className="flex items-center gap-2 px-6">
      <h2 className="hidden lg:block text-xl font-bold mb-2 text-gray-300">
        Sort by Priority:
      </h2>
      <select
        value={priority}
        onChange={(e) => handlePriorityChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
      >
        <option value="">Select Priority</option>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default PriorityFilter;
