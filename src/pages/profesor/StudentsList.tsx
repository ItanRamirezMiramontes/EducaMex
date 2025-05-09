import React from "react";
import { FaUserAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Componente para cada estudiante individual
const StudentCard = ({
  studentName,
  status,
  photoUrl,
}: {
  studentName: string;
  status: string;
  photoUrl: string;
}) => {
  const statusColor = status === "Aprobado" ? "text-green-500" : "text-red-500";
  const statusIcon =
    status === "Aprobado" ? <FaCheckCircle /> : <FaTimesCircle />;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex space-x-4 w-full">
      <img
        src={photoUrl}
        alt="Foto del estudiante"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-700">{studentName}</h4>
        <div className="flex items-center text-sm">
          {statusIcon}
          <span className={`ml-2 ${statusColor}`}>{status}</span>
        </div>
      </div>
    </div>
  );
};

// Componente principal de la lista de estudiantes
const StudentsList = () => {
  const students = [
    {
      name: "Juan Pérez",
      status: "Aprobado",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Laura González",
      status: "Reprobado",
      photo: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Carlos Martínez",
      status: "Aprobado",
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Ana Rodríguez",
      status: "Aprobado",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-full mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Estudiantes</h3>
      <p className="text-sm text-gray-600 mb-6">
        Visualiza el progreso y desempeño de tus estudiantes. Haz clic en un
        estudiante para ver más detalles.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            studentName={student.name}
            status={student.status}
            photoUrl={student.photo}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
