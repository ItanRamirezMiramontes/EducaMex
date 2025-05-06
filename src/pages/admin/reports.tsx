import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Eye, Trash2 } from "lucide-react";

// Tipos de reportes
type Report = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdBy: string;
};

// Datos dummy de reportes
const dummyReports: Report[] = [
  {
    id: "1",
    title: "Reporte de rendimiento de Juan Pérez",
    description:
      "Este reporte incluye el rendimiento de Juan en las últimas actividades.",
    date: "2025-05-05",
    createdBy: "Admin",
  },
  {
    id: "2",
    title: "Reporte de actividades de Ana Torres",
    description: "Este reporte contiene el progreso de las actividades de Ana.",
    date: "2025-04-28",
    createdBy: "Admin",
  },
  {
    id: "3",
    title: "Reporte de progreso de Carlos Gómez",
    description: "Informe sobre el progreso de Carlos en su rol de profesor.",
    date: "2025-05-01",
    createdBy: "Admin",
  },
];

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const handleViewReport = (id: string) => {
    alert(`Ver detalles del reporte ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Reportes</h1>

      {/* Filtros y acciones */}
      <div className="mb-6">
        <Button variant="outline" className="mr-2">
          Filtrar
        </Button>
        <Button variant="primary">Crear Nuevo Reporte</Button>
      </div>

      {/* Lista de reportes */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Lista de Reportes</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Creado por</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-2">{report.title}</td>
                <td className="px-4 py-2">{report.description}</td>
                <td className="px-4 py-2">{report.date}</td>
                <td className="px-4 py-2">{report.createdBy}</td>
                <td className="px-4 py-2">
                  <Button
                    onClick={() => handleViewReport(report.id)}
                    variant="outline"
                    className="mr-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteReport(report.id)}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
