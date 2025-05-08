import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../../backend/database/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("estudiante");
  const [institutionName, setInstitutionName] = useState(""); // Nuevo campo para la institución
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Verificar si la institución existe
      const institutionsRef = collection(firestore, "institutions");
      const q = query(institutionsRef, where("name", "==", institutionName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("La institución no existe.");
        return; // Terminar la función si no existe la institución
      }

      const institutionId = querySnapshot.docs[0].id; // Obtener el ID de la institución

      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Crear documento de usuario en Firestore
      await setDoc(doc(firestore, "users", uid), {
        uid,
        name,
        lastName1,
        lastName2,
        email,
        phone,
        profilePicture: "",
        role,
        institutionId, // Guardar el ID de la institución
        status: "activo",
        createdAt: new Date(),
        lastLogin: new Date(),
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
      });

      // Redirigir según el rol
      if (role === "estudiante") {
        navigate("/student");
      } else if (role === "profesor") {
        navigate("/teacher");
      } else {
        navigate("/admin");
      }
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError(
          "Este correo electrónico ya está registrado. Por favor, usa otro."
        );
      } else if (err.code === "auth/invalid-email") {
        setError("El correo electrónico proporcionado no es válido.");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Error al registrar usuario. Intenta de nuevo.");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        <div className="text-center mb-6">
          <img
            className="mx-auto h-14 w-auto mb-4"
            src="/educamex_logo.png"
            alt="Educamex"
          />
          <h2 className="text-3xl font-extrabold text-gray-800">Registrarse</h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nombre(s)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {/* Apellido paterno */}
          <div>
            <label
              htmlFor="lastName1"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido paterno
            </label>
            <input
              type="text"
              id="lastName1"
              placeholder="Apellido paterno"
              value={lastName1}
              onChange={(e) => setLastName1(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {/* Apellido materno */}
          <div>
            <label
              htmlFor="lastName2"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido materno
            </label>
            <input
              type="text"
              id="lastName2"
              placeholder="Apellido materno"
              value={lastName2}
              onChange={(e) => setLastName2(e.target.value)}
              className="input-style"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Ej. 3312345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {/* Correo */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {/* Rol */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-style"
            >
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          {/* Institución */}
          <div>
            <label
              htmlFor="institution"
              className="block text-sm font-medium text-gray-700"
            >
              Institución
            </label>
            <input
              type="text"
              id="institution"
              placeholder="Nombre de la institución"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-lg font-semibold text-white shadow-lg hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 focus:ring-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <br />
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
