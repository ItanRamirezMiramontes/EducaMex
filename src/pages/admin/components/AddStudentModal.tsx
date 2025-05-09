import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../../../backend/database/firebase";

type Student = {
  id: string;
  name: string;
  role: string;
};

type AddStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (studentId: string) => void;
  institutionId: string;
  classId: string;
  updateClassInState: (studentId: string) => void;
  modalMode: "add" | "view";
};

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  institutionId,
  classId,
  updateClassInState,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentIdsInClass, setStudentIdsInClass] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener estudiantes de la institución
        const q = query(
          collection(firestore, "users"),
          where("role", "==", "estudiante"),
          where("institutionId", "==", institutionId)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Desconocido",
          role: doc.data().role || "Desconocido",
        }));
        setStudents(data);

        // Obtener ids de estudiantes ya en la clase
        const classRef = doc(firestore, "classes", classId);
        const classSnap = await getDoc(classRef);
        if (classSnap.exists()) {
          const classData = classSnap.data();
          const ids: string[] = classData.studentIds || [];
          setStudentIdsInClass(ids);
        } else {
          setError("Clase no encontrada.");
        }
      } catch (err) {
        console.error(err);
        setError("❌ Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, institutionId, classId]);

  const handleAddStudent = async (studentId: string) => {
    try {
      const classRef = doc(firestore, "classes", classId);
      const updatedStudentIds = [...studentIdsInClass, studentId];

      await updateDoc(classRef, {
        studentIds: updatedStudentIds,
      });

      setStudentIdsInClass(updatedStudentIds); // actualiza local
      updateClassInState(studentId);
      onAdd(studentId);
      onClose();
    } catch (error) {
      console.error("❌ Error al agregar estudiante:", error);
      alert("Ocurrió un error al agregar el estudiante.");
    }
  };

  if (!isOpen) return null;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Agregar Alumno</h2>

        {loading && <p>Cargando estudiantes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && students.length === 0 && (
          <p>No hay estudiantes disponibles.</p>
        )}

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Buscar estudiante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {filteredStudents.map((student) => {
            const alreadyInClass = studentIdsInClass.includes(student.id);

            return (
              <li
                key={student.id}
                className="flex justify-between items-center py-2 px-4 border-b border-gray-200 rounded-lg"
              >
                <span className="text-sm">{student.name}</span>
                <button
                  onClick={() => handleAddStudent(student.id)}
                  disabled={alreadyInClass}
                  className={`${
                    alreadyInClass
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out`}
                >
                  {alreadyInClass ? "Ya está en la clase" : "Agregar"}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={onClose}
          className="absolute top-1 right-1 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default AddStudentModal;
