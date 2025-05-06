import { Link } from "react-router-dom";

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
      <div className="space-y-2">
        <Link
          to="/admin/clases"
          className="block p-3 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
        >
          Crear Clase
        </Link>
        <Link
          to="/admin/users"
          className="block p-3 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
        >
          Crear Usuario
        </Link>
        <Link
          to="/admin/reports"
          className="block p-3 bg-orange-500 text-white rounded-lg text-center hover:bg-orange-600"
        >
          Ver Reportes
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
