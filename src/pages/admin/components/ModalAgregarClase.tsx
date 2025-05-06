import React, { useState } from "react";

interface ModalAgregarClaseProps {
  toggleModal: () => void;
}

export default function ModalAgregarClase({
  toggleModal,
}: ModalAgregarClaseProps) {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Nueva clase creada:", { name, teacher, description });
    toggleModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Agregar Nueva Clase
        </h2>
        <input
          type="text"
          className="mt-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre de la clase"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="mt-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Profesor asignado"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />
        <textarea
          className="mt-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción de la clase"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-6 flex justify-between">
          <button
            onClick={toggleModal}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
