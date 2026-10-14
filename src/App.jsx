import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import TopPage from "./pages/TopPage";
import CultivationPage from "./pages/CultivationPage";
import EmployeesListPage from "./pages/EmployeesListPage";
import EmployeesRegisterPage from "./pages/EmployeesRegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/top"
        element={
          <ProtectedRoute>
            <TopPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cultivation"
        element={
          <ProtectedRoute>
            <CultivationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employeeslist"
        element={
          <ProtectedRoute>
            <EmployeesListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employeeregister"
        element={
          <ProtectedRoute>
            <EmployeesRegisterPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/top" replace />} />
    </Routes>
  );
}

export default App;
