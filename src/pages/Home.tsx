import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <section
        id="hero"
        className="min-h-screen bg-blue-600 text-white flex flex-col justify-center items-center text-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenido a EduProgres
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          La plataforma educativa para medir el avance real de tus alumnos
        </p>
        <a
          href="#features"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition"
        >
          Conoce más
        </a>
      </section>

      <section id="about" className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Qué es EduProgres?</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Es una plataforma modular diseñada para docentes y alumnos, donde
          pueden interactuar con actividades organizadas por materia, y
          visualizar el progreso individual en tiempo real.
        </p>
      </section>

      <section id="features" className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Características principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              Inicio de sesión simulado
            </h3>
            <p>
              Acceso con usuario y contraseña para visualizar la experiencia
              completa.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Tablero de materias</h3>
            <p>
              Visualiza todas las materias con sus actividades correspondientes.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Progreso visual</h3>
            <p>
              Calcula el porcentaje de avance por materia y destaca áreas de
              mejora.
            </p>
          </div>
        </div>
      </section>

      <section id="screenshots" className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Capturas de la plataforma</h2>
        <p className="mb-4 text-lg">
          (En desarrollo, estas son vistas simuladas del diseño)
        </p>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <div className="w-64 h-40 bg-gray-300 rounded-lg shadow-inner flex items-center justify-center">
            Vista 1
          </div>
          <div className="w-64 h-40 bg-gray-300 rounded-lg shadow-inner flex items-center justify-center">
            Vista 2
          </div>
          <div className="w-64 h-40 bg-gray-300 rounded-lg shadow-inner flex items-center justify-center">
            Vista 3
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 px-6 text-center bg-blue-600 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Contacto</h2>
        <p className="mb-4">¿Tienes dudas o comentarios? Escríbenos.</p>
        <a
          href="mailto:contacto@eduprogress.com"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition"
        >
          itan.ramirez7732@alumnos.udg.mx
        </a>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 bg-white">
        © 2025 EducaMex. Todos los derechos reservados.
      </footer>
    </>
  );
}
