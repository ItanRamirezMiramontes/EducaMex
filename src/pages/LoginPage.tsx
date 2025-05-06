import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import Lottie from "lottie-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cargaData, setCargaData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      fetch("/carga.json")
        .then((res) => res.json())
        .then(setCargaData)
        .catch((err) => console.error("Error cargando la animación:", err));
    }
  }, [loading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        if (!userRole) {
          setError("Rol no asignado para el usuario.");
          return;
        }

        switch (userRole) {
          case "estudiante":
            navigate("/student");
            break;
          case "profesor":
            navigate("/teacher");
            break;
          case "administrador":
            navigate("/admin");
            break;
          default:
            setError("Rol no válido.");
        }
      } else {
        setError("No se encontró el perfil del usuario.");
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Usuario no encontrado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && cargaData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-60 h-60">
          <Lottie animationData={cargaData} loop autoplay />
        </div>
        <p className="mt-4 text-lg">Iniciando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        <div className="text-center mb-6">
          <img
            className="mx-auto h-14 w-auto mb-4"
            src="/educamex_logo.png"
            alt="Educamex"
          />
          <h2 className="text-3xl font-extrabold text-gray-800">
            Iniciar sesión
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo"
              className="mt-1 w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition"
              required
            />
          </div>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="mt-1 w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-lg font-semibold text-white shadow-lg hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?
          <br />
          <a
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
