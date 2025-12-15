import React, { useState } from "react";

const RSA: React.FC = () => {
    const [message, setMessage] = useState("");
    const [encrypted, setEncrypted] = useState<string>("");
    const [decrypted, setDecrypted] = useState("");
    const [publicKey, setPublicKey] = useState<[number, number]>([0, 0]);
    const [privateKey, setPrivateKey] = useState<[number, number]>([0, 0]);

    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    const modInverse = (e: number, phi: number): number => {
        let [t, newT, r, newR] = [0, 1, phi, e];
        while (newR !== 0) {
            const quotient = Math.floor(r / newR);
            [t, newT] = [newT, t - quotient * newT];
            [r, newR] = [newR, r - quotient * newR];
        }
        return t < 0 ? t + phi : t;
    };

    const PRIMES = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

    const generateKeys = () => {
        let p = PRIMES[Math.floor(Math.random() * PRIMES.length)];
        let q = PRIMES[Math.floor(Math.random() * PRIMES.length)];
        while (q === p) q = PRIMES[Math.floor(Math.random() * PRIMES.length)];

        const n = p * q;
        const phi = (p - 1) * (q - 1);

        let e = 3;
        while (gcd(e, phi) !== 1 && e < phi) e += 2;

        const d = modInverse(e, phi);

        setPublicKey([e, n]);
        setPrivateKey([d, n]);
        setEncrypted("");
        setDecrypted("");
    };

    const modPow = (base: number, exp: number, mod: number): number => {
        let result = 1;
        base = base % mod;
        while (exp > 0) {
            if (exp % 2 === 1) result = (result * base) % mod;
            base = (base * base) % mod;
            exp = Math.floor(exp / 2);
        }
        return result;
    };

    const encrypt = () => {
        const [e, n] = publicKey;
        if (n === 0) return alert("Сначала надо сгенерировать ключи!");

        const cipherNumbers = Array.from(message).map((ch) => modPow(ch.charCodeAt(0), e, n));

        const maxDigits = n.toString().length;

        const encryptedString = cipherNumbers.map((num) => num.toString().padStart(maxDigits, "0")).join("");

        setEncrypted(encryptedString);
        setDecrypted("");
    };

    const decrypt = () => {
        const [d, n] = privateKey;
        if (n === 0 || !encrypted) return alert("Строка пустаяяяяя!");

        const maxDigits = n.toString().length;

        if (encrypted.length % maxDigits !== 0) {
            alert("Некорректный формат зашифрованной строки!");
            return;
        }

        const cipherNumbers: number[] = [];
        for (let i = 0; i < encrypted.length; i += maxDigits) {
            const block = encrypted.substring(i, i + maxDigits);
            cipherNumbers.push(parseInt(block, 10));
        }

        const text = cipherNumbers.map((num) => String.fromCharCode(modPow(num, d, n))).join("");

        setDecrypted(text);
    };

    return (
        <div className="container">
            <h2>RSA шифр</h2>

            <button onClick={generateKeys}>Сгенерировать ключи</button>

            <div>
                <strong>Публичный ключ (e, n):</strong> {publicKey[0]}, {publicKey[1]}
            </div>
            <div>
                <strong>Приватный ключ (d, n):</strong> {privateKey[0]}, {privateKey[1]}
            </div>

            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Введите сообщение для шифрования(En)" />

            <div className="button-row">
                <button onClick={encrypt}>Зашифровать</button>
                <button onClick={decrypt}>Расшифровать</button>
            </div>

            <textarea value={decrypted || encrypted} rows={4} placeholder="Результат" />
        </div>
    );
};

export default RSA;
