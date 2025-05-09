import React, { useEffect, useState } from "react";
import { firestore } from "../../../../backend/database/firebase";
import { doc, getDoc } from "firebase/firestore";

type ClassInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
};

type Student = {
  id: string;
  name: string;
};

const ClassInfoModal: React.FC<ClassInfoModalProps> = ({
  isOpen,
  onClose,
  classId,
}) => {
  const [classInfo, setClassInfo] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (!classId) return;

      try {
        // Obtener información de la clase
        const classDocRef = doc(firestore, "classes", classId);
        const classDoc = await getDoc(classDocRef);
        if (classDoc.exists()) {
          setClassInfo(classDoc.data());
        }

        // Obtener información de los estudiantes
        if (classDoc.exists()) {
          const studentIds = classDoc.data().studentIds || [];
          const studentsData: Student[] = [];

          for (const studentId of studentIds) {
            const studentDocRef = doc(firestore, "users", studentId);
            const studentDoc = await getDoc(studentDocRef);
            if (studentDoc.exists()) {
              studentsData.push({
                id: studentDoc.id,
                name: studentDoc.data().name,
              });
            }
          }
          setStudents(studentsData);
        }
      } catch (error) {
        console.error("❌ Error al obtener la información de la clase", error);
      }
    };

    if (isOpen) {
      fetchClassInfo();
    }
  }, [isOpen, classId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Información de la Clase</h2>
        {classInfo && (
          <div>
            <p className="text-lg font-semibold">Nombre: {classInfo.name}</p>
            <p>Profesor: {classInfo.teacherName}</p>
            <p>Aula: {classInfo.room}</p>
            <p>Estudiantes inscritos:</p>
            <ul className="mt-2">
              {students.length > 0 ? (
                students.map((student) => (
                  <li key={student.id} className="text-gray-700">
                    {student.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-700">No hay estudiantes inscritos</li>
              )}
            </ul>
          </div>
        )}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassInfoModal;
