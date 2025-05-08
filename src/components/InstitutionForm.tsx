import { useState } from "react";
import { createInstitution } from "../../backend/database/institutions"; // Asegúrate de que esta ruta sea correcta

export default function InstitutionForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logoUrl: "",
    academicYearStart: "",
    academicYearEnd: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInstitution({
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        theme: {
          primaryColor: "#0000FF",
          secondaryColor: "#FFFFFF",
          logoUrl: formData.logoUrl || "",
        },
        adminId: "admin-placeholder-id",
      });
      alert("Institución creada con éxito");
      setFormData({
        name: "",
        address: "",
        logoUrl: "",
        academicYearStart: "",
        academicYearEnd: "",
      });
    } catch (error: any) {
      console.error("Error al crear la institución:", error.message);
      alert(`No se pudo crear la institución: ${error.message}`);
      throw new Error("Hubo un problema al crear la institución.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-md"
    >
      <div>
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

      <div>
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

      <div>
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

      <div>
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

      <div>
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-4"
      >
        Crear Institución
      </button>
    </form>
  );
}
