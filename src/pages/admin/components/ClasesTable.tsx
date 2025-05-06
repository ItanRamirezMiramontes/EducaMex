// ClasesTable.tsx
import ClaseCard from "./ClaseCard";

const clases = [
  {
    id: "1",
    name: "Matemáticas",
    studentsCount: 30,
    teacher: "Prof. Juan",
    description: "Curso de matemáticas básicas para secundaria.",
  },
  {
    id: "2",
    name: "Ciencias",
    studentsCount: 25,
    teacher: "Prof. Ana",
    description: "Curso de ciencias naturales para primaria.",
  },
  {
    id: "3",
    name: "Historia",
    studentsCount: 15,
    teacher: "Prof. Roberto",
    description: "Historia universal para preparatoria.",
  },
];

export default function ClasesTable() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {clases.map((clase) => (
        <ClaseCard key={clase.id} clase={clase} />
      ))}
    </div>
  );
}
