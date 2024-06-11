import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewFormPage from "./pages/NewFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-white w-screen h-screen m-auto flex justify-center items-center space-y-8 flex-col text-black">
              <HomePage />
            </div>
          }
        />
        <Route
          path="/newform"
          element={
            <div className="bg-white w-screen h-screen m-auto flex justify-center items-center space-y-8 flex-col text-black">
              <NewFormPage />
            </div>
          }
        />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
