import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const smoothScroll = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
};

// Componente NavBar
export default function NavBar() {
  const navigate = useNavigate();

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const targetId = (e.target as HTMLAnchorElement)
          .getAttribute("href")
          ?.substring(1);
        if (targetId) {
          smoothScroll(targetId);
        }
      });
    });
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/educamex_logo.png"
                alt="educamex_logo"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#about"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  ¿Qué es EducaMex?
                </a>
                <a
                  href="#features"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Tecnologias
                </a>
                <a
                  href="#screenshots"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  ODS
                </a>
                <a
                  href="#contact"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Integrantes
                </a>
              </div>
            </div>
          </div>

          {/* Botón de Iniciar sesión alineado a la derecha */}
          <div className="ml-auto">
            <button
              onClick={handleLoginClick}
              className="text-white px-6 py-2 rounded-full font-semibold transition"
              style={{ backgroundColor: "#248a24" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
