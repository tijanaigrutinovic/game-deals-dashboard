import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticatedHomepage from "./pages/AuthenticatedHomepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authenticated-homepage" element={<AuthenticatedHomepage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;