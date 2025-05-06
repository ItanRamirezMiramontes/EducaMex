// src/pages/admin/institution/components/AlertsPanel.tsx
import React from "react";
import { Card, CardContent } from "../../../../components/Card";
import { AlertTriangle, Info } from "lucide-react";

// Tipado de alertas
export interface Alert {
  id: string;
  message: string;
  type: "warning" | "info";
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Alertas</h3>
        <ul className="space-y-3">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-center gap-3 text-sm">
              {alert.type === "warning" ? (
                <AlertTriangle className="text-yellow-600 w-5 h-5" />
              ) : (
                <Info className="text-blue-600 w-5 h-5" />
              )}
              <span>{alert.message}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
