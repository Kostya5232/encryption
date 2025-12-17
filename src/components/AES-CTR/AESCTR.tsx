import React, { useState } from "react";

const AESCTR: React.FC = () => {
    const [message, setMessage] = useState("");
    const [key, setKey] = useState("kringe228");
    const [counter, setCounter] = useState(1);
    const [encrypted, setEncrypted] = useState("");
    const [decrypted, setDecrypted] = useState("");

    const AESBlock = (block: number, keyChar: number) => {
        return block ^ keyChar;
    };

    const stringToCodes = (str: string): number[] => {
        return Array.from(str).map((c) => c.charCodeAt(0));
    };

    const codesToString = (codes: number[]): string => {
        return String.fromCharCode(...codes);
    };

    const encrypt = () => {
        const msgCodes = stringToCodes(message);
        const keyCodes = stringToCodes(key);
        const output: number[] = [];

        for (let i = 0; i < msgCodes.length; i++) {
            const counterValue = counter + i;
            const keyCode = keyCodes[i % keyCodes.length];

            const keystream = AESBlock(counterValue, keyCode);
            output.push(msgCodes[i] ^ keystream);
        }

        setEncrypted(output.map((c) => c.toString(16).padStart(4, "0")).join(""));
    };

    const decrypt = () => {
        const keyCodes = stringToCodes(key);
        const cipherCodes: number[] = [];

        for (let i = 0; i < encrypted.length; i += 4) {
            cipherCodes.push(parseInt(encrypted.slice(i, i + 4), 16));
        }

        const output: number[] = [];

        for (let i = 0; i < cipherCodes.length; i++) {
            const counterValue = counter + i;
            const keyCode = keyCodes[i % keyCodes.length];

            const keystream = AESBlock(counterValue, keyCode);
            output.push(cipherCodes[i] ^ keystream);
        }

        setDecrypted(codesToString(output));
    };

    return (
        <div className="container">
            <h2>AES-CTR шифр</h2>

            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Ключ" />

            <input type="number" value={counter} onChange={(e) => setCounter(Number(e.target.value))} placeholder="Счётчик" />

            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Введите текст" />

            <div className="button-row">
                <button onClick={encrypt}>Зашифровать</button>
                <button onClick={decrypt}>Расшифровать</button>
            </div>

            <textarea value={encrypted} readOnly rows={4} placeholder="Зашифрованный текст" />

            <textarea value={decrypted} readOnly rows={4} placeholder="Расшифрованный текст" />
        </div>
    );
};

export default AESCTR;
