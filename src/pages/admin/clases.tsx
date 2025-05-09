import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../../backend/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AddClassModal from "./components/AddClassModal";
import AddStudentModal from "./components/AddStudentModal"; // Modal para agregar estudiante
import ClassCard from "./components/ClassCard";
import ClassSummary from "./components/ClassSummary";
import ClassFilters from "./components/ClassFilters";
import ClassInfoModal from "./components/ClassInfoModal"; // Importar el modal de información de clase

type ClassItem = {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  studentsCount: number;
  institutionId: string;
  room: string;
  studentIds: string[];
};

const ClasesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false); // Estado para abrir el modal de agregar estudiante
  const [isClassInfoModalOpen, setIsClassInfoModalOpen] = useState(false); // Estado para abrir el modal de información de la clase
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null); // Estado para guardar el ID de la clase seleccionada
  const [modalMode, setModalMode] = useState<"add" | "view">("add"); // Añadido para controlar el tipo de modal

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.institutionId) {
              setInstitutionId(data.institutionId);
            } else {
              console.error("❌ El usuario no tiene institutionId");
            }
          }
        } catch (error) {
          console.error("❌ Error al obtener usuario:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!institutionId) return;

      try {
        const q = query(
          collection(firestore, "classes"),
          where("institutionId", "==", institutionId)
        );

        const querySnapshot = await getDocs(q);
        const fetched: ClassItem[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            name: data.name || "",
            teacherId: data.teacherId || "",
            teacherName: data.teacherName || "Desconocido",
            studentCount: data.studentIds ? data.studentIds.length : 0,
            studentsCount: data.studentIds ? data.studentIds.length : 0,
            institutionId: data.institutionId,
            room: data.room || "",
            studentIds: data.studentIds || [],
          });
        });

        setClasses(fetched);
      } catch (error) {
        console.error("❌ Error al obtener clases:", error);
      }
    };

    fetchClasses();
  }, [institutionId]);

  const handleAddClass = async (
    name: string,
    teacherId: string,
    room: string
  ) => {
    try {
      if (!institutionId) return;

      const teacherDoc = await getDoc(doc(firestore, "users", teacherId));
      if (!teacherDoc.exists()) return;

      const teacherData = teacherDoc.data();
      if (teacherData.institutionId !== institutionId) return;

      const newClass = {
        name,
        teacherId,
        room,
        createdAt: Timestamp.now(),
        studentIds: [],
        institutionId,
        teacherName: teacherData.name || "Desconocido",
        studentsCount: 0,
      };

      const docRef = await addDoc(collection(firestore, "classes"), newClass);

      setClasses((prev) => [
        ...prev,
        {
          id: docRef.id,
          name,
          teacherId,
          studentCount: 0,
          institutionId,
          room,
          studentIds: [],
          teacherName: teacherData.name || "Desconocido",
          studentsCount: 0,
        },
      ]);
    } catch (error) {
      console.error("❌ Error al agregar clase:", error);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      await deleteDoc(doc(firestore, "classes", classId));
      setClasses((prev) => prev.filter((c) => c.id !== classId));
    } catch (error) {
      console.error("❌ Error al eliminar clase:", error);
    }
  };

  const handleViewClassInfo = (classId: string) => {
    setSelectedClassId(classId);
    setIsClassInfoModalOpen(true); // Abrir el modal de información de la clase
  };

  const handleAddStudent = (classId: string) => {
    setSelectedClassId(classId);
    setModalMode("add"); // Cambiar el modo a 'add' para "Agregar Estudiante"
    setIsStudentModalOpen(true); // Abrir el modal
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Clases</h1>

      <ClassSummary
        totalClasses={filteredClasses.length}
        totalStudents={filteredClasses.reduce(
          (acc, c) => acc + c.studentCount,
          0
        )}
        totalTeachers={new Set(filteredClasses.map((c) => c.teacherId)).size}
      />

      <ClassFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredClasses.map((cls) => (
          <ClassCard
            key={cls.id}
            classData={cls}
            onDelete={handleDeleteClass}
            onAddStudent={handleAddStudent}
            onViewList={handleViewClassInfo} // Usar handleViewClassInfo para abrir el modal de clase
          />
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        + Nueva Clase
      </button>

      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClass={handleAddClass}
        institutionId={institutionId}
      />

      {/* Modal para agregar estudiante */}
      <AddStudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onAdd={(studentId: string) => {
          if (selectedClassId) {
            setClasses((prev) =>
              prev.map((cls) =>
                cls.id === selectedClassId
                  ? {
                      ...cls,
                      studentIds: [...cls.studentIds, studentId],
                      studentCount: cls.studentCount + 1,
                      studentsCount: cls.studentsCount + 1,
                    }
                  : cls
              )
            );
          } else {
            console.error("❌ No se ha seleccionado una clase");
          }
        }}
        updateClassInState={(studentId: string) => {
          if (selectedClassId) {
            setClasses((prev) =>
              prev.map((cls) =>
                cls.id === selectedClassId
                  ? {
                      ...cls,
                      studentIds: [...cls.studentIds, studentId],
                      studentCount: cls.studentCount + 1,
                      studentsCount: cls.studentsCount + 1,
                    }
                  : cls
              )
            );
          }
        }}
        classId={selectedClassId || ""}
        institutionId={institutionId || ""}
        modalMode={modalMode}
      />

      {/* Modal para ver la información de la clase */}
      <ClassInfoModal
        isOpen={isClassInfoModalOpen}
        onClose={() => setIsClassInfoModalOpen(false)}
        classId={selectedClassId || ""}
      />
    </div>
  );
};

export default ClasesPage;
