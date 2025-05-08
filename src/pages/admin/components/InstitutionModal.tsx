// components/InstitutionModal.tsx
import React from "react";

interface InstitutionData {
  name: string;
  address?: string;
  logoUrl?: string;
  settings?: any;
  academicYearStart?: string;
  academicYearEnd?: string;
  gradingScale?: any;
  customFields?: any;
}

interface InstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: InstitutionData | null;
}

const InstitutionModal: React.FC<InstitutionModalProps> = ({
  isOpen,
  onClose,
  institution,
}) => {
  if (!isOpen || !institution) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        {institution.logoUrl && (
          <div className="mb-4 flex justify-center">
            <img
              src={institution.logoUrl}
              alt="Logo"
              className="h-16 object-contain"
            />
          </div>
        )}

        <h2 className="text-xl font-semibold text-blue-700 mb-3">
          {institution.name}
        </h2>

        {institution.address && (
          <p className="text-gray-600 mb-2">
            <strong>Dirección:</strong> {institution.address}
          </p>
        )}

        {institution.academicYearStart && (
          <p className="text-sm text-gray-500">
            <strong>Inicio del año académico:</strong>{" "}
            {institution.academicYearStart}
          </p>
        )}

        {institution.academicYearEnd && (
          <p className="text-sm text-gray-500">
            <strong>Fin del año académico:</strong>{" "}
            {institution.academicYearEnd}
          </p>
        )}
      </div>
    </div>
  );
};

export default InstitutionModal;
