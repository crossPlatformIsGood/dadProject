import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CopyPage from "./pages/CopyPage";
import HomePage from "./pages/HomePage";
import NewFormPage from "./pages/NewFormPage";
import PrintPage from "./pages/PrintPage";

function App() {
	return (
		<Router basename={import.meta.env.BASE_URL}>
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
