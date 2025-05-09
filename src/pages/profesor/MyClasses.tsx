import React, { useState } from "react";
import { FaBookOpen, FaInfoCircle } from "react-icons/fa";

// Componente para cada clase individual
const ClassItem = ({
  className,
  onViewDetails,
}: {
  className: string;
  onViewDetails: () => void;
}) => {
  return (
    <li className="flex justify-between items-center py-3 border-b hover:bg-gray-50 cursor-pointer">
      <span className="flex items-center space-x-2 text-lg font-medium text-gray-700">
        <FaBookOpen className="text-blue-500" />
        <span>{className}</span>
      </span>
      <button
        onClick={onViewDetails}
        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2"
      >
        <FaInfoCircle />
        <span>Ver detalles</span>
      </button>
    </li>
  );
};

// Componente principal de Mis Clases
const MyClasses = () => {
  const [classes] = useState([
    { className: "Ciencias de la Computación" },
    { className: "Matemáticas Avanzadas" },
  ]);

  const handleViewDetails = (className: string) => {
    alert(`Detalles de la clase: ${className}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">Mis Clases</h3>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Añadir Nueva Clase
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Gestiona y visualiza todas tus clases activas y asignaciones. Haz clic
        en cualquier clase para ver más detalles.
      </p>
      <ul className="space-y-4">
        {classes.map((cls, index) => (
          <ClassItem
            key={index}
            className={cls.className}
            onViewDetails={() => handleViewDetails(cls.className)}
          />
        ))}
      </ul>
    </div>
  );
};

export default MyClasses;
