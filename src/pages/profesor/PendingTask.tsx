import React, { useState } from "react";
import {
  FaPlus,
  FaCheckCircle,
  FaExclamationCircle,
  FaEdit,
} from "react-icons/fa";

// Componente para cada tarea individual
const TaskItem = ({
  taskName,
  status,
}: {
  taskName: string;
  status: string;
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "text-red-500";
      case "En revisión":
        return "text-yellow-500";
      case "Completada":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex justify-between items-center py-3 border-b hover:bg-gray-50">
      <span className="flex items-center space-x-2">
        {status === "Completada" ? (
          <FaCheckCircle className="text-green-500" />
        ) : status === "Pendiente" ? (
          <FaExclamationCircle className="text-red-500" />
        ) : (
          <FaExclamationCircle className="text-yellow-500" />
        )}
        <span>{taskName}</span>
      </span>
      <span className={`font-semibold ${getStatusStyle(status)}`}>
        {status}
      </span>
    </div>
  );
};

// Componente principal de Tareas Pendientes
const PendingTasks = () => {
  const [tasks, setTasks] = useState([
    { taskName: "Programación en Java", status: "Pendiente" },
    { taskName: "Ecuaciones Diferenciales", status: "En revisión" },
    { taskName: "Desarrollo de API", status: "Completada" },
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completada"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pendiente"
  ).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">
          Gestión de Tareas
        </h3>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition">
          <FaPlus />
          <span>Añadir Tarea</span>
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Aquí puedes revisar el estado de las tareas asignadas a tus estudiantes.
      </p>

      {/* Grid de estadísticas de actividades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">
            Total de Actividades
          </h4>
          <p className="text-3xl font-bold text-gray-800">{totalTasks}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">Completadas</h4>
          <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">Pendientes</h4>
          <p className="text-3xl font-bold text-red-500">{pendingTasks}</p>
        </div>
      </div>

      {/* Lista de tareas */}
      <ul className="space-y-4 w-full">
        {tasks.map((task, index) => (
          <TaskItem key={index} taskName={task.taskName} status={task.status} />
        ))}
      </ul>
    </div>
  );
};

export default PendingTasks;
