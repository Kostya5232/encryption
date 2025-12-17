import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CaesarCipher from "./components/CaesarCipher/CaesarCipher";
import EnigmaCipher from "./components/EnigmaСipher/EnigmaСipher";
import "./App.css";
import BlockCipher from "./components/BlockCipher/BlockCipher";
import RSA from "./components/RSA/RSA";
import AESCTR from "./components/AES-CTR/AESCTR";

function App() {
    return (
        <Router>
            <div className="menu">
                <Link to="/home">Главная</Link> | <Link to="/caesar">Шифр Цезаря</Link> | <Link to="/enigma">Шифр Энигма</Link> |{" "}
                <Link to="/block">DES-блочный шифр</Link> | <Link to="/rsa">RSA шифр</Link> | <Link to="/aesctr">AES-CTR шифр</Link>
            </div>

            <Routes>
                <Route path="/" element={<AESCTR />} />
                <Route path="/home" element={<Home />} />
                <Route path="/caesar" element={<CaesarCipher />} />
                <Route path="/enigma" element={<EnigmaCipher />} />
                <Route path="/block" element={<BlockCipher />} />
                <Route path="/rsa" element={<RSA />} />
                <Route path="/aesctr" element={<AESCTR />} />
            </Routes>
        </Router>
    );
}

export default App;
