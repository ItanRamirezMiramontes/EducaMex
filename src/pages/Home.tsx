import NavBar from "../components/NavBar";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCheckCircle,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex flex-col justify-center items-center text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
          Bienvenido a EducaMex
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Plataforma educativa inteligente para transformar el aprendizaje y
          monitoreo en tiempo real.
        </p>
        <a
          href="#features"
          className="bg-white text-indigo-700 px-8 py-4 rounded-full font-semibold shadow-md hover:bg-indigo-100 transition"
        >
          Descubre cómo funciona
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6 text-indigo-700">
          ¿Qué es EducaMex?
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700 mb-4">
          EducaMex es una plataforma educativa modular construida con tecnología
          moderna que permite a las instituciones gestionar clases, alumnos y
          progreso académico de manera personalizada, intuitiva y eficiente.
        </p>
        <p className="max-w-3xl mx-auto text-md text-gray-600">
          Cada usuario accede a un entorno diseñado según su rol: administrador,
          profesor o estudiante. Todo desde una interfaz moderna, adaptable y
          enfocada en el aprendizaje.
        </p>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gray-100 py-24 px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">
          Beneficios de EducaMex
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaChartLine className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Seguimiento en tiempo real
            </h3>
            <p className="text-gray-600">
              Visualiza el progreso de cada estudiante con gráficos claros y
              actualizaciones inmediatas.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaClock className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ahorro de tiempo</h3>
            <p className="text-gray-600">
              Automatiza tareas administrativas y enfócate en lo importante:
              enseñar y aprender.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaCheckCircle className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Resultados medibles</h3>
            <p className="text-gray-600">
              Obtén informes detallados del rendimiento académico y toma
              decisiones con base en datos reales.
            </p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section
        id="features"
        className="py-24 px-6 bg-gradient-to-b from-indigo-50 to-white"
      >
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-16">
          Módulos de la Plataforma
        </h2>

        {/* Admin */}
        <div className="flex flex-col md:flex-row items-center mb-24 w-full max-w-7xl mx-auto gap-10">
          <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-xl shadow-inner flex items-center justify-center text-xl text-gray-700">
            Imagen del tablero del Administrador
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <FaUserShield /> Panel del Administrador
            </h3>
            <p className="text-lg text-gray-700">
              Gestión completa del sistema: crea clases, asigna profesores,
              configura permisos y analiza rendimiento.
            </p>
          </div>
        </div>

        {/* Teacher */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-24 w-full max-w-7xl mx-auto gap-10">
          <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-xl shadow-inner flex items-center justify-center text-xl text-gray-700">
            Imagen del tablero del Profesor
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <FaChalkboardTeacher /> Panel del Profesor
            </h3>
            <p className="text-lg text-gray-700">
              Gestiona clases, asigna actividades, realiza seguimiento por
              alumno y genera reportes detallados.
            </p>
          </div>
        </div>

        {/* Student */}
        <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10">
          <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-xl shadow-inner flex items-center justify-center text-xl text-gray-700">
            Imagen del tablero del Estudiante
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <FaUserGraduate /> Panel del Estudiante
            </h3>
            <p className="text-lg text-gray-700">
              Visualiza progreso, realiza actividades interactivas y avanza a tu
              ritmo con una interfaz motivadora.
            </p>
          </div>
        </div>
      </section>

      {/* ODS Section */}
      <section id="ods" className="py-20 px-6 text-center bg-indigo-50">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Comprometidos con los Objetivos de Desarrollo Sostenible
        </h2>
        <p className="max-w-3xl mx-auto text-lg mb-8 text-gray-700">
          EducaMex promueve una educación inclusiva, equitativa y de calidad
          para todos, alineada con la agenda 2030.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">ODS 4</h3>
            <p className="text-gray-600">
              Educación de calidad para promover el desarrollo integral.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              ODS 10
            </h3>
            <p className="text-gray-600">
              Reducción de desigualdades mediante acceso equitativo a educación
              digital.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
            <h3 className="text-xl font-semibold mb-2 text-purple-700">
              ODS 17
            </h3>
            <p className="text-gray-600">
              Fomento de alianzas estratégicas entre instituciones, docentes y
              comunidades.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-6 text-center bg-indigo-800 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="mb-4 text-lg">
          Escríbenos y transforma la educación con nosotros.
        </p>
        <a
          href="mailto:itan.ramirez7732@alumnos.udg.mx"
          className="bg-white text-indigo-800 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition"
        >
          Contactar
        </a>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 bg-white">
        © 2025 EducaMex. Todos los derechos reservados.
      </footer>
    </>
  );
}
