// src/pages/admin/institution/components/RecentActivity.tsx
import React from "react";
import { Card, CardContent } from "../../../../components/Card";

// Definimos el tipo de datos para la actividad
interface Activity {
  id: number;
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Actividad reciente</h3>
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id} className="text-sm text-muted-foreground">
              <span className="block font-medium text-black">
                {activity.description}
              </span>
              <span className="text-xs">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
