import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(10); // Default length
    const [numberChanged, setNumberChanged] = useState(false);
    const [charChanged, setCharChanged] = useState(false);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numberChanged) str += "0123456789";
        if (charChanged) str += "!@#$%^&*()_+{}|:<>?";
        let pass = "";
        for (let i = 0; i < length; i++) {
            pass += str.charAt(Math.floor(Math.random() * str.length));
        }
        setPassword(pass);
    }, [length, numberChanged, charChanged]);

    useEffect(() => {
        generatePassword();
    }, [length, numberChanged, charChanged, generatePassword]);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "18px" }}>
                <div className="password-display" style={{ marginBottom: 0 }}>{password}</div>
                {password && (
                    <button
                        onClick={handleCopy}
                        style={{
                            background: "#ff4081",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 14px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "20px",
                            transition: "background 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        title="Copy to clipboard"
                        aria-label="Copy password"
                    >
                        📋
                    </button>
                )}
                {copied && <span style={{ color: "#4caf50", fontWeight: 500 }}>Copied!</span>}
            </div>
            <div className='First'>
                <div className="form-group">
                    <input
                        type='range'
                        min={4}
                        max={20}
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        id="length-range"
                    />
                    <label htmlFor="length-range">Length ({length})</label>
                </div>
                <div className="form-group">
                    <input
                        type='checkbox'
                        id='number'
                        checked={numberChanged}
                        onChange={() => setNumberChanged(!numberChanged)}
                    />
                    <label htmlFor="number">Number</label>
                </div>
                <div className="form-group">
                    <input
                        type='checkbox'
                        id='character'
                        checked={charChanged}
                        onChange={() => setCharChanged(!charChanged)}
                    />
                    <label htmlFor='character'>Character</label>
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PasswordGenerator />);