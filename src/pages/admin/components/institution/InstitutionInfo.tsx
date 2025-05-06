// src/pages/admin/institution/components/InstitutionInfo.tsx
import React from "react";
import { Card, CardContent } from "../../../../components/Card";
import { Button } from "../../../../components/ui/button";
import { PencilIcon } from "lucide-react";

interface InstitutionData {
  name: string;
  id: string;
  createdAt: string;
  subscriptionStatus: "activa" | "inactiva" | "pendiente";
}

const mockInstitution: InstitutionData = {
  name: "Instituto Educativo Nueva Generación",
  id: "INST-00123",
  createdAt: "2023-08-15",
  subscriptionStatus: "activa",
};

export const InstitutionInfo: React.FC = () => {
  const { name, id, createdAt, subscriptionStatus } = mockInstitution;

  const statusColor =
    subscriptionStatus === "activa"
      ? "text-green-600"
      : subscriptionStatus === "pendiente"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <Card className="w-full max-w-full shadow-md rounded-lg">
      <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6">
        <div className="space-y-2 w-full">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">ID: {id}</p>
          <p className="text-sm text-gray-500">
            Fecha de registro: {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className={`text-sm font-medium ${statusColor}`}>
            Estado de suscripción: {subscriptionStatus}
          </p>
        </div>
        <Button variant="outline" className="gap-2 px-4 py-2 mt-4 md:mt-0">
          <PencilIcon className="h-4 w-4" />
          Editar información
        </Button>
      </CardContent>
    </Card>
  );
};

export default InstitutionInfo;
