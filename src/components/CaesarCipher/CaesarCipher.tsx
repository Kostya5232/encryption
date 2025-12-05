import { useState } from "react";
import "./CaesarCipher.css";

const alphabetEN: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetRU: string = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

const detectAlphabet = (text: string) => {
    if (/[А-Яа-яЁё]/.test(text)) {
        return alphabetRU;
    }
    return alphabetEN;
};

const shiftChar = (char: string, shift: number, alphabet: string) => {
    const upper = char.toUpperCase();
    const index = alphabet.indexOf(upper);

    if (index === -1) return char;

    const newIndex = (index + shift + alphabet.length) % alphabet.length;

    let result = alphabet[newIndex];

    if (char === char.toLowerCase()) {
        result = result.toLowerCase();
    }

    return result;
};

const caesarEncrypt = (text: string, shift: number) => {
    return text
        .split("")
        .map((char) => {
            if (/[A-Za-z]/.test(char)) return shiftChar(char, shift, alphabetEN);
            if (/[А-Яа-яЁё]/.test(char)) return shiftChar(char, shift, alphabetRU);
            return char;
        })
        .join("");
};

const caesarDecrypt = (text: string, shift: number) => {
    return caesarEncrypt(text, -shift);
};

const caesarBruteForce = (text: string) => {
    const alphabet = detectAlphabet(text);
    const maxShift = alphabet.length;

    const results: string[] = [];

    for (let i = 1; i < maxShift; i++) {
        results.push(`Сдвиг ${i}: ${caesarDecrypt(text, i)}`);
    }

    return results.join("\n");
};

export default function CaesarCipher() {
    const [inputText, setInputText] = useState("");
    const [shift, setShift] = useState(3);
    const [output, setOutput] = useState("");

    return (
        <div className="container">
            <h1>Шифр Цезаря</h1>

            <label>Входной текст:</label>
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} rows={4} />

            <label>Сдвиг:</label>
            <input type="number" value={shift} onChange={(e) => setShift(Number(e.target.value))} />

            <div className="button-row">
                <button onClick={() => setOutput(caesarEncrypt(inputText, shift))}>Зашифровать</button>

                <button onClick={() => setOutput(caesarDecrypt(inputText, shift))}>Расшифровать</button>

                <button onClick={() => setOutput(caesarBruteForce(inputText))}>Взломать</button>
            </div>

            <label>Результат:</label>
            <div className="result-box">{output}</div>
        </div>
    );
}
