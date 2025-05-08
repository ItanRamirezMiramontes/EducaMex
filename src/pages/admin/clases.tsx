import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../../backend/database/firebase";
import { auth } from "../../../backend/database/firebase"; // Asegúrate de importar la autenticación de Firebase
import { onAuthStateChanged } from "firebase/auth"; // Importar para obtener el usuario logueado
import ClassList from "./components/ClassList";
import ClassSummary from "./components/ClassSummary";
import ClassProgressChart from "./components/ClassProgressChart";
import ClassFilters from "./components/ClassFilters";
import AddClassModal from "./components/AddClassModal";

type ClassItem = {
  id: string;
  name: string;
  teacherId: string;
  studentCount: number;
  institutionId: string; // Agregar campo institutionId
};

const ClasesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [institutionId, setInstitutionId] = useState<string | null>(null); // Estado para almacenar institutionId

  // Obtener el institutionId del usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Obtener el institutionId desde la base de datos o de un campo del usuario
        setInstitutionId(user.uid); // Aquí se asume que el institutionId es igual al uid del usuario logueado
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(firestore, "classes"));
      const fetchedClasses: ClassItem[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedClasses.push({
          id: doc.id,
          name: data.name || "",
          teacherId: data.teacherId || "",
          studentCount: data.studentIds?.length || 0,
          institutionId: data.institutionId || "", // Asegúrate de que cada clase tenga un institutionId
        });
      });

      console.log("📥 Clases cargadas desde Firebase:", fetchedClasses);
      setClasses(fetchedClasses);
    };

    fetchClasses();
  }, []);

  const handleAddClass = async (name: string, teacherId: string) => {
    try {
      if (!institutionId) {
        console.error("❌ No se ha encontrado el institutionId");
        return;
      }

      // Verificar si el profesor existe y pertenece a la misma institución
      const teacherDocRef = doc(firestore, "users", teacherId);
      const teacherDoc = await getDoc(teacherDocRef);

      if (!teacherDoc.exists()) {
        console.error("❌ El profesor no existe.");
        return;
      }

      const teacherData = teacherDoc.data();
      const teacherInstitutionId = teacherData?.institutionId;

      if (teacherInstitutionId !== institutionId) {
        console.error("❌ El profesor no pertenece a la misma institución.");
        return;
      }

      // Si pasa la validación, agregamos la clase
      const newClass = {
        name,
        teacherId,
        room: "",
        createdAt: Timestamp.now(),
        studentIds: [],
        schedule: {},
        institutionId, // Agregar el institutionId
      };

      const docRef = await addDoc(collection(firestore, "classes"), newClass);

      const addedClass: ClassItem = {
        id: docRef.id,
        name,
        teacherId,
        studentCount: 0,
        institutionId, // Agregar el institutionId
      };

      setClasses((prev) => [...prev, addedClass]);

      console.log("✅ Clase agregada exitosamente:", addedClass);
    } catch (error) {
      console.error("❌ Error al agregar clase:", error);
    }
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Panel de Clases</h1>

      <ClassSummary
        totalClasses={classes.length}
        totalStudents={classes.reduce((acc, c) => acc + c.studentCount, 0)}
        totalTeachers={new Set(classes.map((c) => c.teacherId)).size}
      />

      <ClassProgressChart
        data={[12, 19, 3, 5, 2, 3]}
        labels={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]}
      />

      <ClassFilters onFilter={setSearchQuery} />

      <ClassList
        classes={filteredClasses.map((cls) => ({
          ...cls,
          teacher: cls.teacherId,
        }))}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded mt-6"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Clase
      </button>

      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClass={handleAddClass}
      />
    </div>
  );
};

export default ClasesPage;
