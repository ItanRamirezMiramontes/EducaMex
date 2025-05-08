import React, { useState } from "react";
import { User } from "../types";
import InstitutionModal from "./InstitutionModal";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [institutionData, setInstitutionData] = useState<any>(null);

  const handleInstitutionClick = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "institutions", user.institutionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setInstitutionData({
          name: data.name,
          address: data.address,
          logoUrl: data.logoUrl,
          academicYearStart: data.settings?.academicYearStart
            ?.toDate()
            .toLocaleDateString(),
          academicYearEnd: data.settings?.academicYearEnd
            ?.toDate()
            .toLocaleDateString(),
          gradingScale: data.gradingScale,
          customFields: data.customFields,
        });
        setIsModalOpen(true);
      } else {
        console.warn("No se encontró la institución");
      }
    } catch (error) {
      console.error("Error al obtener la institución", error);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Foto de perfil"
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">
              {user.name} {user.lastName1}
            </h2>
            <p className="text-sm text-gray-500">{user.role}</p>
            <button
              onClick={handleInstitutionClick}
              className="text-blue-600 text-sm mt-1 underline hover:text-blue-800"
            >
              Ver institución
            </button>
          </div>
        </div>
      </div>

      <InstitutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        institution={institutionData}
      />
    </>
  );
};

export default UserCard;
