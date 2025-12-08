import { useState } from "react";

// Английский
const alphabetEng = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rotorEngI = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const rotorEngII = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const rotorEngIII = "BDFHJLCPRTXVZNYEIWGAKMUSQO";

const reflectorEngB = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

// Русский
const alphabetRu = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

const rotorRuI = "БГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯАВ";
const rotorRuII = "ВЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯАБГД";
const rotorRuIII = "ГЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯАБВЕД";

const reflectorRu = "ЯЮЭЬЫЪЩШЧЦХФУТСРПОНМЛКЙИЗЖЕДГВБА";

function rotateRotor(rotor: string): string {
    return rotor.slice(1) + rotor[0];
}

function enigmaEncrypt(
    text: string,
    alphabet: string,
    rotor1: string,
    rotor2: string,
    rotor3: string,
    reflector: string,
    pos1: number,
    pos2: number,
    pos3: number
) {
    let r1 = rotor1;
    let r2 = rotor2;
    let r3 = rotor3;

    let out = "";

    for (let i = 0; i < pos1; i++) r1 = rotateRotor(r1);
    for (let i = 0; i < pos2; i++) r2 = rotateRotor(r2);
    for (let i = 0; i < pos3; i++) r3 = rotateRotor(r3);

    for (let ch of text.toUpperCase()) {
        if (!alphabet.includes(ch)) {
            out += ch;
            continue;
        }

        r1 = rotateRotor(r1);
        pos1 = (pos1 + 1) % alphabet.length;

        if (pos1 === 0) {
            r2 = rotateRotor(r2);
            pos2 = (pos2 + 1) % alphabet.length;

            if (pos2 === 0) {
                r3 = rotateRotor(r3);
                pos3 = (pos3 + 1) % alphabet.length;
            }
        }

        let idx = alphabet.indexOf(ch);
        idx = alphabet.indexOf(r1[idx]);
        idx = alphabet.indexOf(r2[idx]);
        idx = alphabet.indexOf(r3[idx]);

        idx = alphabet.indexOf(reflector[idx]);

        idx = r3.indexOf(alphabet[idx]);
        idx = r2.indexOf(alphabet[idx]);
        idx = r1.indexOf(alphabet[idx]);

        out += alphabet[idx];
    }

    return out;
}

export default function Enigma() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [pos3, setPos3] = useState(0);

    const detectAlphabet = (str: string) => {
        const eng = /[A-Za-z]/.test(str);
        const rus = /[А-Яа-яЁё]/.test(str);
        if (eng) return "eng";
        if (rus) return "rus";
        return "unknown";
    };

    const encrypt = () => {
        const language = detectAlphabet(text);

        if (language === "eng") {
            setResult(enigmaEncrypt(text, alphabetEng, rotorEngI, rotorEngII, rotorEngIII, reflectorEngB, pos1, pos2, pos3));
        } else if (language === "rus") {
            setResult(enigmaEncrypt(text, alphabetRu, rotorRuI, rotorRuII, rotorRuIII, reflectorRu, pos1, pos2, pos3));
        } else {
            setResult("Текст не найден");
        }
    };

    return (
        <div className="container">
            <h2>Шифр Энигма</h2>

            <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Введите текст" />

            <h3>Позиции роторов</h3>
            <div>
                <input type="number" min={0} max={32} value={pos1} onChange={(e) => setPos1(Number(e.target.value))} />
                <input type="number" min={0} max={32} value={pos2} onChange={(e) => setPos2(Number(e.target.value))} />
                <input type="number" min={0} max={32} value={pos3} onChange={(e) => setPos3(Number(e.target.value))} />
            </div>

            <div className="button-row">
                <button onClick={encrypt}>Зашифровать</button>

                <button onClick={encrypt}>Расшифровать</button>
            </div>
            <h3>Результат:</h3>
            <div>{result}</div>
        </div>
    );
}
