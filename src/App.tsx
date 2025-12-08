import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CaesarCipher from "./components/CaesarCipher/CaesarCipher";
import EnigmaCipher from "./components/EnigmaСipher/EnigmaСipher";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="menu">
                <Link to="/home">Главная</Link> | <Link to="/caesar">Шифр Цезаря</Link> | <Link to="/enigma">Шифр Энигма</Link>
            </div>

            <Routes>
                <Route path="/" element={<EnigmaCipher />} />
                <Route path="/home" element={<Home />} />
                <Route path="/caesar" element={<CaesarCipher />} />
                <Route path="/enigma" element={<EnigmaCipher />} />
            </Routes>
        </Router>
    );
}

export default App;
