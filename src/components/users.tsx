import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

// Tipos de usuarios
type User = {
  id: string;
  name: string;
  email: string;
  role: "estudiante" | "profesor" | "administrador";
  status: "activo" | "inactivo";
};

// Datos dummy de usuarios
const dummyUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "estudiante",
    status: "activo",
  },
  {
    id: "2",
    name: "Ana Torres",
    email: "ana@example.com",
    role: "profesor",
    status: "inactivo",
  },
  {
    id: "3",
    name: "Carlos Gómez",
    email: "carlos@example.com",
    role: "administrador",
    status: "activo",
  },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "estudiante",
    status: "activo",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: String(users.length + 1) }]);
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "estudiante",
      status: "activo",
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      {/* Formulario de creación de usuario */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Nuevo Usuario</h2>
        <div className="space-y-4">
          <Input
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            name="name"
          />
          <Input
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Correo electrónico"
            name="email"
          />
          <div className="flex space-x-4">
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="administrador">Administrador</option>
            </select>
            <select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <Button onClick={handleAddUser}>Agregar Usuario</Button>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Lista de Usuarios</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Rol</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">
                  <Button
                    onClick={() => alert(`Editar usuario ${user.name}`)}
                    variant="outline"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="destructive"
                    className="ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
