import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Accueil";
import ProfConnexion from "./Pages/interface-connexion-prof";
import StudentConnexion from "./Pages/interface-connexion-student";
import StudentDash from "./Pages/dashboard-student";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professor/connexion" element={<ProfConnexion />} />
        <Route path="/student/connexion" element={<StudentConnexion />} />
        <Route path="/student/dashboard" element={<StudentDash />} />

      </Routes>
    </BrowserRouter>
  );
}
