import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticatedHomepage from "./pages/AuthenticatedHomepage";
import DealDetails from "./pages/DealDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deals/:dealId" element={<DealDetails />} /> 
        <Route path="/authenticated-homepage" element={<AuthenticatedHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
