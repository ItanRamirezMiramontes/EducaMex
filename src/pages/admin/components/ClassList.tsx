import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../../backend/database/firebase";
import { ClassItem } from "../types";

type Student = {
  id: string;
  name: string;
  lastName1: string;
  lastName2: string;
  fullName: string;
};

const ClassList = () => {
  const [classes, setClasses] = useState<
    (ClassItem & { students: Student[] })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchClassesAndStudents = async () => {
    try {
      const classesSnapshot = await getDocs(collection(firestore, "classes"));
      const classDocs = classesSnapshot.docs;

      const allStudentIds = new Set<string>();
      const rawClassData = classDocs.map((doc) => {
        const data = doc.data();
        const studentIds: string[] = Array.isArray(data.studentIds)
          ? data.studentIds
          : [];
        studentIds.forEach((id) => allStudentIds.add(id));
        return {
          id: doc.id,
          name: data.name || "Sin nombre",
          teacherName: data.teacherName || "Desconocido",
          room: data.room || "Sin aula",
          institutionId: data.institutionId || "Sin institución",
          studentIds,
        };
      });

      // Obtener todos los estudiantes en una sola consulta (máx. 10 por query Firestore)
      const studentChunks = [...allStudentIds].reduce<string[][]>(
        (acc, id, i) => {
          const chunkIndex = Math.floor(i / 10);
          if (!acc[chunkIndex]) acc[chunkIndex] = [];
          acc[chunkIndex].push(id);
          return acc;
        },
        []
      );

      const studentsMap = new Map<string, Student>();

      for (const chunk of studentChunks) {
        const usersQuery = query(
          collection(firestore, "users"),
          where("__name__", "in", chunk)
        );
        const studentSnapshot = await getDocs(usersQuery);
        studentSnapshot.forEach((doc) => {
          const data = doc.data();
          const fullName = `${data.name || "Nombre"} ${data.lastName1 || ""} ${
            data.lastName2 || ""
          }`;
          studentsMap.set(doc.id, {
            id: doc.id,
            name: data.name || "Nombre",
            lastName1: data.lastName1 || "Apellido1",
            lastName2: data.lastName2 || "Apellido2",
            fullName, // Asignamos el nombre completo
          });
        });
      }

      const finalClasses = rawClassData.map((cls) => ({
        ...cls,
        students: cls.studentIds.map(
          (id) =>
            studentsMap.get(id) || {
              id,
              name: "Nombre",
              lastName1: "Apellido1",
              lastName2: "Apellido2",
              fullName: "Desconocido",
            }
        ),
        studentCount: cls.studentIds.length,
      }));

      setClasses(finalClasses);
    } catch (error) {
      console.error("❌ Error al obtener clases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesAndStudents();
  }, []);

  if (loading)
    return <p className="p-4 text-lg text-center">Cargando clases...</p>;

  if (classes.length === 0)
    return (
      <p className="p-4 text-lg text-center text-gray-600 italic">
        No hay clases registradas.
      </p>
    );

  return (
    <div className="space-y-6 p-6">
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {cls.name}
          </h2>
          <p className="text-xl text-gray-700 mb-2">
            Profesor: {cls.teacherName}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            Estudiantes: {cls.studentCount}
          </p>
          <p className="text-xl text-gray-700 mb-4">Aula: {cls.room}</p>

          <div className="mt-6">
            <h3 className="text-2xl font-medium text-gray-800 mb-3">
              Alumnos:
            </h3>
            <ul className="space-y-3">
              {cls.students.map((student) => (
                <li
                  key={student.id}
                  className="flex items-center space-x-3 text-lg text-gray-700"
                >
                  <span>{student.fullName}</span>
                </li>
              ))}
              {cls.students.length === 0 && (
                <li className="text-gray-500 italic text-lg">
                  No hay alumnos inscritos.
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
