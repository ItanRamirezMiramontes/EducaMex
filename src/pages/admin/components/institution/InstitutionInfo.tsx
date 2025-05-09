import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Card, CardContent } from "../../../../components/Card";

interface InstitutionData {
  name: string;
  id: string;
  createdAt: string;
  address: string;
  logoUrl: string;
  academicYearStart: string;
  academicYearEnd: string;
  subscriptionStatus: "activa" | "inactiva" | "pendiente";
}

const InstitutionInfo: React.FC = () => {
  const [institutionData, setInstitutionData] =
    useState<InstitutionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInstitutionId = async () => {
      try {
        const userId = "rYCE8Yert0cUvZxUNN99pK4zkaV2"; // Reemplázalo con el ID real del usuario
        const firestore = getFirestore(); // Obtén una instancia de Firestore
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const institutionId = userDoc.data()?.institutionId;

          if (institutionId) {
            const institutionRef = doc(
              firestore,
              "institutions",
              institutionId
            );
            const institutionDoc = await getDoc(institutionRef);

            if (institutionDoc.exists()) {
              const data = institutionDoc.data();
              setInstitutionData({
                name: data.name || "Nombre no disponible",
                id: institutionId,
                createdAt:
                  data.createdAt?.toDate()?.toLocaleDateString() ||
                  "Fecha no disponible",
                address: data.address || "Dirección no disponible",
                logoUrl: data.logoUrl || "",
                academicYearStart:
                  data.academicYearStart?.toDate()?.toLocaleDateString() ||
                  "Fecha no disponible",
                academicYearEnd:
                  data.academicYearEnd?.toDate()?.toLocaleDateString() ||
                  "Fecha no disponible",
                subscriptionStatus: data.subscriptionStatus || "pendiente",
              });
            } else {
              setError("No se encontró el documento de la institución.");
            }
          } else {
            setError(
              "El campo 'institutionId' no está disponible en los datos del usuario."
            );
          }
        } else {
          setError("No se encontró el documento del usuario.");
        }
      } catch (error) {
        setError("Error al obtener los datos de la institución.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInstitutionId();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }

  if (!institutionData) {
    return (
      <div className="text-center p-6">
        No se encontraron datos de la institución.
      </div>
    );
  }

  const {
    name,
    id,
    createdAt,
    address,
    logoUrl,
    academicYearStart,
    academicYearEnd,
    subscriptionStatus,
  } = institutionData;

  const statusColor =
    subscriptionStatus === "activa"
      ? "text-green-600"
      : subscriptionStatus === "pendiente"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <Card className="w-full max-w-7xl shadow-lg rounded-xl border border-gray-300 bg-white overflow-hidden">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 items-center">
        <div className="flex justify-center md:justify-start">
          {logoUrl && (
            <img
              src="/educamex-logo.png"
              alt="Logo de la institución"
              className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-full border-4 border-gray-200 shadow-md"
            />
          )}
        </div>

        {/* Nombre e ID */}
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">ID: {id}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Dirección:</span> {address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Fecha de registro:</span> {createdAt}
          </p>
        </div>

        {/* Fechas académicas y estado */}
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Año académico comienza:</span>{" "}
            {academicYearStart}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Año académico termina:</span>{" "}
            {academicYearEnd}
          </p>
          <p className={`text-sm font-semibold ${statusColor}`}>
            <span className="font-medium">Estado de suscripción:</span>{" "}
            {subscriptionStatus}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstitutionInfo;
