import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  addDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import UserCard from "./components/UserCard";
import { User } from "./types";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName1: "",
    lastName2: "",
    email: "",
    phone: "",
    role: "estudiante",
    institutionId: "", // Aquí se guarda el ID de la institución
    profilePicture: "",
    address: "",
    city: "",
    state: "",
    street: "",
    zip: "",
  });
  const [institutions, setInstitutions] = useState<any[]>([]); // Lista de instituciones
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        const usersList: User[] = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const userData = docSnapshot.data();

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
              institutionName,
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

    // Obtener las instituciones disponibles
    const fetchInstitutions = async () => {
      try {
        const q = query(collection(db, "institutions"));
        const querySnapshot = await getDocs(q);
        const institutionsList = querySnapshot.docs.map((docSnapshot) => {
          const instData = docSnapshot.data();
          return { id: docSnapshot.id, name: instData.name };
        });
        setInstitutions(institutionsList);
      } catch (error) {
        console.error("Error al obtener las instituciones: ", error);
      }
    };

    fetchInstitutions();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const newUserRef = await addDoc(collection(db, "users"), newUser);
      console.log("Usuario agregado con ID: ", newUserRef.id);
      setIsModalOpen(false);
      setNewUser({
        name: "",
        lastName1: "",
        lastName2: "",
        email: "",
        phone: "",
        role: "estudiante",
        institutionId: "",
        profilePicture: "",
        address: "",
        city: "",
        state: "",
        street: "",
        zip: "",
      });
      window.location.reload(); // Recarga los usuarios
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">Cargando usuarios...</div>
    );
  }

  return (
    <div className="p-6">
      {/* Botón Agregar Usuario */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Agregar Usuario
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar usuario por nombre o rol..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.uid} user={user} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No se encontraron usuarios.
          </div>
        )}
      </div>

      {/* Modal para agregar usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Agregar Nuevo Usuario
            </h2>

            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName1"
                value={newUser.lastName1}
                onChange={handleChange}
                placeholder="Primer Apellido"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName2"
                value={newUser.lastName2}
                onChange={handleChange}
                placeholder="Segundo Apellido"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <select
                name="role"
                value={newUser.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            {/* Select para institución */}
            <div className="mb-4">
              <select
                name="institutionId"
                value={newUser.institutionId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Seleccionar Institución</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Agregar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
