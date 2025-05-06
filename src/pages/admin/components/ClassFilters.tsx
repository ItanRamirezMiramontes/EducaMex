// src/components/ClassFilters.tsx
import React from "react";

interface ClassFiltersProps {
  onFilter: (query: string) => void;
}

const ClassFilters: React.FC<ClassFiltersProps> = ({ onFilter }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <input
        type="text"
        placeholder="Buscar clase"
        className="w-1/3 p-2 border border-gray-300 rounded"
        onChange={(e) => onFilter(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded">Filtrar</button>
    </div>
  );
};

export default ClassFilters;
