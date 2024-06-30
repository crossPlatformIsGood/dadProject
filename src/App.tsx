import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewFormPage from "./pages/NewFormPage";
import PrintPage from "./pages/PrintPage";
import CopyPage from "./pages/CopyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newform" element={<NewFormPage />} />
        <Route path="/print" element={<PrintPage />} />
        <Route path="/copy" element={<CopyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
