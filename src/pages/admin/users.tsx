import React, { useState, useEffect } from "react";
import { collection, getDocs, getDoc, query, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import UserCard from "./components/UserCard";
import { User } from "./types";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        const usersList: User[] = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const userData = docSnapshot.data();

            // Obtener institución
            let institutionName = "Sin institución";
            if (userData.institutionId) {
              const instDoc = await getDoc(
                doc(db, "institutions", userData.institutionId)
              );
              if (instDoc.exists()) {
                const instData = instDoc.data();
                institutionName = instData.name || "Nombre no disponible";
              }
            }

            return {
              uid: userData.uid,
              name: userData.name,
              lastName1: userData.lastName1,
              lastName2: userData.lastName2,
              email: userData.email,
              phone: userData.phone,
              role: userData.role,
              profilePicture: userData.profilePicture,
              status: userData.status,
              institutionId: userData.institutionId,
              institutionName, // Aquí añadimos el nombre
              createdAt: userData.createdAt
                ? userData.createdAt.toDate().toLocaleString()
                : null,
              lastLogin: userData.lastLogin
                ? userData.lastLogin.toDate().toLocaleString()
                : null,
              address: userData.address,
              city: userData.city,
              state: userData.state,
              street: userData.street,
              zip: userData.zip,
            };
          })
        );

        setUsers(usersList);
      } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">Cargando usuarios...</div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar usuario por nombre o rol..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.uid} user={user} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No se encontraron usuarios.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
