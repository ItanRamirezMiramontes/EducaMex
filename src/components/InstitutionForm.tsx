import { useState } from "react";
import { firestore } from "../../backend/database/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Definir el tipo de las props
interface InstitutionFormProps {
  closeForm: () => void;
}

const InstitutionForm: React.FC<InstitutionFormProps> = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logoUrl: "",
    academicYearStart: "",
    academicYearEnd: "",
    createdAt: new Date().toISOString(), // Marca de tiempo actual
    gradingScale: "",
  });

  const [loading, setLoading] = useState(false);

  // Función para crear la institución en Firestore
  const createInstitution = async (institutionData: {
    slug: string;
    theme: { primaryColor: string; secondaryColor: string; logoUrl: string };
    adminId: string;
    name: string;
    address: string;
    logoUrl: string;
    academicYearStart: Timestamp;
    academicYearEnd: Timestamp;
    createdAt: Timestamp;
    gradingScale: string;
  }) => {
    try {
      const institutionsRef = collection(firestore, "institutions");
      await addDoc(institutionsRef, institutionData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al crear la institución: " + error.message);
      } else {
        throw new Error("Error al crear la institución: " + String(error));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de fechas
    if (
      new Date(formData.academicYearStart) > new Date(formData.academicYearEnd)
    ) {
      alert(
        "El año académico de inicio no puede ser posterior al año académico de fin."
      );
      return;
    }

    setLoading(true); // Mostrar cargando

    try {
      await createInstitution({
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        theme: {
          primaryColor: "#0000FF",
          secondaryColor: "#FFFFFF",
          logoUrl: formData.logoUrl || "",
        },
        adminId: "admin-placeholder-id", // Este debe ser un ID real de administrador
        academicYearStart: Timestamp.fromDate(
          new Date(formData.academicYearStart)
        ),
        academicYearEnd: Timestamp.fromDate(new Date(formData.academicYearEnd)),
        createdAt: Timestamp.fromDate(new Date(formData.createdAt)),
      });
      alert("Institución creada con éxito");
      setFormData({
        name: "",
        address: "",
        logoUrl: "",
        academicYearStart: "",
        academicYearEnd: "",
        createdAt: new Date().toISOString(),
        gradingScale: "",
      });
    } catch (error: any) {
      console.error("Error al crear la institución:", error.message);
      alert(`No se pudo crear la institución: ${error.message}`);
    } finally {
      setLoading(false); // Ocultar cargando
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Crear Institución</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
              value={formData.name}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              name="address"
              placeholder="Dirección"
              onChange={handleChange}
              value={formData.address}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              URL del logo
            </label>
            <input
              name="logoUrl"
              placeholder="URL del logo"
              onChange={handleChange}
              value={formData.logoUrl}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Año académico de inicio
            </label>
            <input
              name="academicYearStart"
              type="date"
              onChange={handleChange}
              value={formData.academicYearStart}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Año académico de fin
            </label>
            <input
              name="academicYearEnd"
              type="date"
              onChange={handleChange}
              value={formData.academicYearEnd}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Fecha de creación
            </label>
            <input
              name="createdAt"
              type="datetime-local"
              onChange={handleChange}
              value={formData.createdAt}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Escala de calificación
            </label>
            <input
              name="gradingScale"
              placeholder="Escala de calificación"
              onChange={handleChange}
              value={formData.gradingScale}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto mt-4"
              disabled={loading} // Deshabilitar el botón mientras está cargando
            >
              {loading ? "Creando..." : "Crear Institución"}
            </button>

            <button
              onClick={closeForm}
              className="mt-4 w-full sm:w-auto text-gray-600 hover:text-gray-900"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstitutionForm;
