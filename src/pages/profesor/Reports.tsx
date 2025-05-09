import React from "react";
import { FaChartLine } from "react-icons/fa";

const Reports = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold">Reportes</h3>
      <p className="text-sm text-gray-500">
        Genera reportes detallados sobre el rendimiento de los estudiantes.
      </p>
      <ul className="mt-4">
        <li className="flex justify-between items-center py-2 border-b">
          <span>Reporte de Clases de Programación</span>
          <span className="text-blue-500 cursor-pointer">Ver reporte</span>
        </li>
        <li className="flex justify-between items-center py-2 border-b">
          <span>Reporte de Matemáticas</span>
          <span className="text-blue-500 cursor-pointer">Ver reporte</span>
        </li>
      </ul>
    </div>
  );
};

export default Reports;
