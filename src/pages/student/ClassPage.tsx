import { useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";

export default function ClassPage() {
  const {} = useParams();

  // Simulación de datos (eventualmente lo conectarás con Firebase)
  const classData = {
    name: "Ciencias Naturales - Nivel 1",
    room: "Aula 203",
    teacher: "Prof. Ana López",
    description:
      "Esta clase explora temas básicos de biología, ecología y el cuerpo humano. Los estudiantes aprenderán conceptos fundamentales sobre el medio ambiente y los sistemas biológicos.",
    activities: [
      {
        id: "act1",
        title: "Ciclo del Agua",
        type: "Interactivo",
        status: "Activa",
      },
      {
        id: "act2",
        title: "Partes del cuerpo",
        type: "Evaluación",
        status: "Inactiva",
      },
      {
        id: "act3",
        title: "Ecosistemas",
        type: "Lectura",
        status: "Activa",
      },
      {
        id: "act4",
        title: "Examen Final",
        type: "Evaluación",
        status: "Inactiva",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Información general de la clase */}
      <Card>
        <CardContent className="p-6 space-y-4 bg-blue-50 border-l-4 border-blue-500 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800">{classData.name}</h2>
          <div className="space-x-4">
            <p className="text-gray-500">Aula: {classData.room}</p>
            <p className="text-gray-500">Profesor(a): {classData.teacher}</p>
          </div>
          <p className="text-sm text-gray-600 mt-4">{classData.description}</p>
        </CardContent>
      </Card>

      {/* Actividades */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Actividades</h3>
          <Button variant="outline" className="px-4 py-2 text-sm font-semibold">
            Agregar actividad
          </Button>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {classData.activities.map((activity) => (
            <Card
              key={activity.id}
              className="hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <CardContent className="p-6 space-y-4">
                <h4 className="font-semibold text-xl text-gray-800">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-500">Tipo: {activity.type}</p>
                <p className="text-sm text-gray-500">
                  Estado:{" "}
                  <span
                    className={`font-semibold ${
                      activity.status === "Activa"
                        ? "text-green-500"
                        : activity.status === "Inactiva"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {activity.status}
                  </span>
                </p>
                <Button variant="outline" className="w-full mt-4">
                  Ver actividad
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
