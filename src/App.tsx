import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CaesarCipher from "./components/CaesarCipher/CaesarCipher";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="menu">
                <Link to="/home">Главная</Link> | <Link to="/caesar">Шифр Цезаря</Link>
            </div>

            <Routes>
                <Route path="/" element={<CaesarCipher />} />
                <Route path="/home" element={<Home />} />
                <Route path="/caesar" element={<CaesarCipher />} />
            </Routes>
        </Router>
    );
}

export default App;
