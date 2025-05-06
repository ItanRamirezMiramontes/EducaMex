// src/pages/admin/institution/components/OverviewCards.tsx
import React from "react";
import { Card, CardContent } from "../../../../components/Card";
import { GraduationCap, Users, BookOpen, Activity } from "lucide-react";

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}

const stats: StatCard[] = [
  {
    title: "Estudiantes",
    value: 120,
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Profesores",
    value: 12,
    icon: <Users className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Clases activas",
    value: 18,
    icon: <BookOpen className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Actividades",
    value: 250,
    icon: <Activity className="w-6 h-6 text-orange-600" />,
  },
];

const OverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4">
          <CardContent className="flex items-center gap-4">
            {stat.icon}
            <div>
              <h4 className="text-sm text-muted-foreground">{stat.title}</h4>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;
