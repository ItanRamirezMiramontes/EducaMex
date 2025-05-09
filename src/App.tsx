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
import UsersPage from "./pages/admin/users";
import DashBoardStudent from "./pages/student/DashBoardStudent";
import DashBoardProfesor from "./pages/profesor/DashBoardProfesor";
import InstitutionForm from "./components/InstitutionForm";
import ClassPage from "./pages/student/ClassPage";
import StudentsList from "./pages/profesor/StudentsList";
import PendingTasks from "./pages/profesor/PendingTask";
import MyClasses from "./pages/profesor/MyClasses";
import Reports from "./pages/profesor/Reports";

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
          <Route path="clas" element={<ClassPage />} />
        </Route>

        {/* Rutas para profesores */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<DashBoardProfesor />} />
          <Route path="classes" element={<ClassPage />} />
          <Route path="task" element={<PendingTasks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="my-class" element={<MyClasses />} />
          <Route path="student" element={<StudentsList />} />
        </Route>

        {/* Rutas para administradores */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clases" element={<ClasesPageAdmin />} />
          <Route path="institution" element={<InstitutionPageAdmin />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route
            path="institution-form"
            element={
              <InstitutionForm closeForm={() => console.log("Form closed")} />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
