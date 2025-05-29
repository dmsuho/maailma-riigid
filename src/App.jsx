import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryDetails from "./pages/CountryDetails";
import Navbar from "./components/Navbar";

function App({ mode, setMode }) {
  return (
    <Router>
      <Navbar mode={mode} setMode={setMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
