interface ClaseCardProps {
  clase: {
    id: string;
    name: string;
    studentsCount: number;
    teacher: string;
    description: string;
  };
}

export default function ClaseCard({ clase }: ClaseCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{clase.name}</h3>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs font-bold rounded-full">
          {clase.studentsCount} Estudiantes
        </span>
      </div>
      <p className="text-sm text-gray-600">{clase.description}</p>
      <p className="mt-2 text-sm text-gray-700">Profesor: {clase.teacher}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
        Ver Detalles
      </button>
    </div>
  );
}
