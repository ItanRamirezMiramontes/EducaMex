import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../../backend/database/firebase";

type AddClassModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (name: string, teacherId: string, room: string) => void;
  institutionId: string | null;
};

const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onAddClass,
  institutionId,
}) => {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [room, setRoom] = useState("");
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (!institutionId) {
        console.error("❌ No hay institutionId");
        return;
      }

      try {
        const q = query(
          collection(firestore, "users"),
          where("institutionId", "==", institutionId),
          where("role", "==", "profesor")
        );

        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("👨‍🏫 Profesores encontrados:", fetched);
        setTeachers(fetched);
      } catch (error) {
        console.error("❌ Error al traer profesores:", error);
      }
    };

    if (isOpen) fetchTeachers();
  }, [isOpen, institutionId]);

  const handleSubmit = () => {
    if (!name || !teacherId || !room) {
      console.error("❌ Faltan campos obligatorios");
      return;
    }

    onAddClass(name, teacherId, room);
    setName("");
    setTeacherId("");
    setRoom("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Agregar Clase</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la clase"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Aula asignada"
          className="w-full border p-2 mb-3 rounded"
        />

        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="">Selecciona un profesor</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name || "Profesor sin nombre"}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClassModal;
