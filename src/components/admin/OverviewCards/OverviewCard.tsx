// src/pages/admin/institution/components/OverviewCard.tsx
import React from "react";

interface OverviewCardProps {
  title: string;
  count: number;
  description: number | string;
  icon: React.ReactNode;
  color: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  count,
  description,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-72 lg:w-80">
      <div className="flex items-center space-x-4">
        <div className="text-4xl text-gray-700">{icon}</div>
        <div>
          <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          <h2 className="text-3xl font-bold text-gray-900">{count}</h2>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
