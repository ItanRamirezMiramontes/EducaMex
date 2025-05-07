import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin";
import ClasesPageAdmin from "./pages/admin/clases";
import InstitutionPageAdmin from "./pages/admin/institution";
import ReportsPage from "./pages/admin/reports";
import UsersPage from "./components/users";
import DashBoardStudent from "./pages/student/DashBoardStudent";
import DashBoardProfesor from "./pages/profesor/DashBoardProfesor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas para estudiantes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<DashBoardStudent />} />
        </Route>

        {/* Rutas para profesores */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<DashBoardProfesor />} />
        </Route>

        {/* Rutas para administradores */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clases" element={<ClasesPageAdmin />} />
          <Route path="institution" element={<InstitutionPageAdmin />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
