import { firestore } from './firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

interface InstitutionData {
    name: string;
    address: string;
    logoUrl: string;
    academicYearStart: string;
    academicYearEnd: string;
    slug: string; // Added slug property
    theme: {
      primaryColor: string;
      secondaryColor: string;
      logoUrl: string;
    };
    adminId: string;
}

export const createInstitution = async (data: InstitutionData) => {
  try {
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos.");

    const { name, address, logoUrl, academicYearStart, academicYearEnd } = data;

    if (!name?.trim()) throw new Error("El nombre de la institución es requerido.");
    if (!address?.trim()) throw new Error("La dirección es requerida.");

    const startDate = new Date(academicYearStart);
    const endDate = new Date(academicYearEnd);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Fechas inválidas.");
    }

    if (startDate >= endDate) {
      throw new Error("La fecha de inicio debe ser anterior a la de fin.");
    }

    if (logoUrl && !/^https?:\/\/[^\s]+$/.test(logoUrl.trim())) {
      throw new Error("URL del logo no válida.");
    }

    // Preparar documento
    const docId = name.toLowerCase().trim().replace(/\s+/g, '-');
    const institutionRef = doc(firestore, 'institutions', docId);
    const institutionData = {
      name: name.trim(),
      address: address.trim(),
      logoUrl: logoUrl?.trim() || '',
      academicYearStart: Timestamp.fromDate(startDate),
      academicYearEnd: Timestamp.fromDate(endDate),
    };

    console.log("Datos a insertar:", institutionData);
    await setDoc(institutionRef, institutionData);
    console.log("✅ Institución creada exitosamente.");
    
  } catch (error: any) {
    console.error("❌ Error al crear la institución:", error);
    throw new Error(error.message || "Error desconocido al crear la institución.");
  }
};
