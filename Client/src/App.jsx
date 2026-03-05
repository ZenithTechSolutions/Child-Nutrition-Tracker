import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import FoodTracking from "./pages/FoodTracking";
import FoodHistory from "./pages/FoodHistory";
import Measurements from "./pages/Measurements";
import Bills from "./pages/Bills";
import BillsHistory from "./pages/BillsHistory";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-history"
          element={
            <ProtectedRoute>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food"
          element={
            <ProtectedRoute>
              <FoodTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-history"
          element={
            <ProtectedRoute>
              <FoodHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/measurements"
          element={
            <ProtectedRoute>
              <Measurements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Bills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills-history"
          element={
            <ProtectedRoute>
              <BillsHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
