import React, { useState } from "react";

const alphabetRu = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const alphabetEn = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const alphabet = alphabetRu + alphabetEn + alphabetRu.toLowerCase() + alphabetEn.toLowerCase() + " .,!?-:;()0123456789";

const BLOCK_SIZE = 8;
const HALF = 4;
const ROUNDS = 6;

const BlockCipher: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [key, setKey] = useState("");

    const charXor = (a: string, b: string): string => {
        const ia = alphabet.indexOf(a);
        const ib = alphabet.indexOf(b);
        if (ia === -1) return a;
        if (ib === -1) return a;
        return alphabet[(ia ^ ib) % alphabet.length];
    };

    const roundFunction = (right: string, roundKey: string): string => {
        let res = "";
        for (let i = 0; i < right.length; i++) {
            res += charXor(right[i], roundKey[i % roundKey.length]);
        }
        return res;
    };

    const getRoundKey = (round: number): string => {
        let rk = "";
        for (let i = 0; i < HALF; i++) {
            rk += key[(round + i) % key.length];
        }
        return rk;
    };

    const processBlock = (block: string, encrypt: boolean): string => {
        let L = block.slice(0, HALF);
        let R = block.slice(HALF);

        if (encrypt) {
            for (let r = 0; r < ROUNDS; r++) {
                const roundKey = getRoundKey(r);
                const F = roundFunction(R, roundKey);

                let newR = "";
                for (let i = 0; i < HALF; i++) {
                    newR += charXor(L[i], F[i]);
                }

                L = R;
                R = newR;
            }
        } else {
            for (let r = ROUNDS - 1; r >= 0; r--) {
                const roundKey = getRoundKey(r);

                const F = roundFunction(L, roundKey);

                let newL = "";
                for (let i = 0; i < HALF; i++) {
                    newL += charXor(R[i], F[i]);
                }

                R = L;
                L = newL;
            }
        }

        return L + R;
    };

    const process = (text: string, encrypt: boolean): string => {
        if (!key.trim()) {
            alert("Введите ключ");
            return "";
        }

        let cleanText = "";
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (alphabet.indexOf(char) !== -1) {
                cleanText += char;
            } else {
                cleanText += " ";
            }
        }

        const padded = cleanText.length % BLOCK_SIZE === 0 ? cleanText : cleanText + " ".repeat(BLOCK_SIZE - (cleanText.length % BLOCK_SIZE));

        let result = "";

        for (let i = 0; i < padded.length; i += BLOCK_SIZE) {
            const block = padded.slice(i, i + BLOCK_SIZE);
            result += processBlock(block, encrypt);
        }

        return result;
    };

    return (
        <div className="container">
            <h2>DES-блочный шифр</h2>

            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Ключ" />

            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                placeholder="Введите текст для шифрования/расшифрования"
            />

            <div className="button-row">
                <button onClick={() => setOutputText(process(inputText, true))}>Зашифровать</button>
                <button onClick={() => setOutputText(process(inputText, false))}>Расшифровать</button>
            </div>

            <textarea value={outputText} readOnly rows={4} placeholder="Результат" />
        </div>
    );
};

export default BlockCipher;
