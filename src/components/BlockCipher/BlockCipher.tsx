import React, { useState } from "react";

const alphabetRu = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const alphabetEn = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const alphabet = alphabetRu + alphabetEn + alphabetRu.toLowerCase() + alphabetEn.toLowerCase() + " .,!?-";

const BLOCK_SIZE = 8;

const BlockCipher: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [key, setKey] = useState("");

    const shiftChar = (char: string, keyChar: string, encrypt = true): string => {
        const idx = alphabet.indexOf(char);
        const kIdx = alphabet.indexOf(keyChar);

        if (idx === -1 || kIdx === -1) return char;

        const mod = alphabet.length;

        const shifted = encrypt ? (idx + kIdx) % mod : (idx - kIdx + mod) % mod;

        return alphabet[shifted];
    };

    const processBlock = (block: string, encrypt: boolean): string => {
        let res = "";

        for (let i = 0; i < block.length; i++) {
            const keyChar = key[i % key.length];
            res += shiftChar(block[i], keyChar, encrypt);
        }

        return res;
    };

    const process = (text: string, encrypt: boolean): string => {
        if (!key.trim()) {
            alert("Введите ключ!");
            return "";
        }

        const paddedText = text.length % BLOCK_SIZE === 0 ? text : text + " ".repeat(BLOCK_SIZE - (text.length % BLOCK_SIZE));

        let result = "";

        for (let i = 0; i < paddedText.length; i += BLOCK_SIZE) {
            const block = paddedText.slice(i, i + BLOCK_SIZE);
            result += processBlock(block, encrypt);
        }

        return result;
    };

    const handleEncrypt = () => setOutputText(process(inputText, true));
    const handleDecrypt = () => setOutputText(process(inputText, false));

    return (
        <div className="container">
            <h2>Блочный шифр</h2>

            <input type="text" placeholder="Ключ" value={key} onChange={(e) => setKey(e.target.value)} />

            <textarea placeholder="Введите текст..." value={inputText} onChange={(e) => setInputText(e.target.value)} rows={4} />

            <div className="button-row">
                <button onClick={handleEncrypt}>Зашифровать</button>
                <button onClick={handleDecrypt}>Расшифровать</button>
            </div>

            <textarea placeholder="Результат..." value={outputText} readOnly rows={4} />
        </div>
    );
};

export default BlockCipher;
