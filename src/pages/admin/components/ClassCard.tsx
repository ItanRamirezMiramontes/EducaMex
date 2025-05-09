import React from "react";

type ClassItem = {
  id: string;
  name: string;
  teacherName: string;
  studentCount: number;
  room: string;
};

type ClassCardProps = {
  classData: ClassItem;
  onDelete: (classId: string) => void;
  onAddStudent: (classId: string) => void;
  onViewList: (classId: string) => void; // NUEVO
};

const ClassCard: React.FC<ClassCardProps> = ({
  classData,
  onDelete,
  onAddStudent,
  onViewList, // NUEVO
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white transition hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800">{classData.name}</h2>
      <p className="text-gray-600 mt-1">Profesor: {classData.teacherName}</p>
      <p className="text-gray-600">Estudiantes: {classData.studentCount}</p>
      <p className="text-gray-600">Aula: {classData.room}</p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onAddStudent(classData.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Agregar Estudiante
        </button>

        <button
          onClick={() => onDelete(classData.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Eliminar Clase
        </button>
      </div>

      {/* Nuevo botón "Ver Lista" */}
      <div className="mt-3 text-right">
        <button
          onClick={() => onViewList(classData.id)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Ver Lista
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
