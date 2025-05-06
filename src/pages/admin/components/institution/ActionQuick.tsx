// src/pages/admin/institution/components/QuickActions.tsx
import React from "react";
import { Card, CardContent } from "../../../../components/Card";
import { Button } from "../../../../components/ui/button";

const QuickActions: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Acciones rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => console.log("Crear clase")}>
            Crear clase
          </Button>
          <Button onClick={() => console.log("Agregar profesor")}>
            Agregar profesor
          </Button>
          <Button onClick={() => console.log("Generar reporte")}>
            Generar reporte
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
