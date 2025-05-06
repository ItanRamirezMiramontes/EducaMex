// src/components/AddClassModal.tsx
import React, { useState } from "react";

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (name: string, teacher: string) => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onAddClass,
}) => {
  const [className, setClassName] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const handleSubmit = () => {
    onAddClass(className, teacherName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Agregar Nueva Clase</h3>
        <div className="mb-4">
          <label htmlFor="class-name" className="block text-sm font-semibold">
            Nombre de la Clase
          </label>
          <input
            type="text"
            id="class-name"
            className="w-full p-2 border border-gray-300 rounded"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="teacher-name" className="block text-sm font-semibold">
            Nombre del Profesor
          </label>
          <input
            type="text"
            id="teacher-name"
            className="w-full p-2 border border-gray-300 rounded"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white p-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Agregar Clase
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClassModal;
