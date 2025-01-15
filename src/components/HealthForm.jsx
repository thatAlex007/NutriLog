import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const HealthForm = () => {
    const { userEmail } = useUser();  // Holt sich die Email des Benutzers aus dem UserContext
    const [formData, setFormData] = useState({
        sex: '',
        weight: '',
        height: '',
        age: '',
    });

    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [loginError, setLoginError] = useState('');  // Zustand für Login-Fehlermeldung

    // Wenn keine Email vorhanden ist (Benutzer nicht eingeloggt), Fehlermeldung anzeigen
    useEffect(() => {
        if (!userEmail) {
            setLoginError('Fehler: User not logged in');
        } else {
            setLoginError('');  // Fehler zurücksetzen, wenn der Benutzer eingeloggt ist
        }
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleButtonClick = async () => {
        setError('');
        setResult('');
        const { sex, weight, height, age } = formData;

        if (!weight || !height || !sex || !age) {
            setError('Bitte alle Felder ausfüllen.');
            return;
        }

        let gur;
        try {
            if (sex === "female") {
                gur = 655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age) + 1 * weight * 24;
            } else if (sex === "male") {
                gur = 655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age) + 1.1 * weight * 24;
            } else {
                setError('Ungültiges Geschlecht ausgewählt.');
                return;
            }

            setResult(`Dein Gesamtumsatz ist: ${gur.toFixed(2)} kcal`);

            const response = await fetch('http://localhost:3000/save-gur', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    gur,
                }),
            });

            if (!response.ok) {
                throw new Error('Fehler beim Speichern der Daten.');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Fehler:', error);
            setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        }
    };

    return (
        <>
            {/* Zeigt nur den Titel und das Formular an, wenn der Benutzer eingeloggt ist */}
            {userEmail ? (
                <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: 'white', backgroundColor: '#333', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                    <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Gesamtumsatzrechner</h1>
                    </header>

                    <form>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="sex" style={{ display: 'block', marginBottom: '5px' }}>Geschlecht:</label>
                            <select
                                name="sex"
                                id="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#444', color: 'white', borderRadius: '8px', border: '1px solid #555' }}
                            >
                                <option value="male">Männlich</option>
                                <option value="female">Weiblich</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="weight" style={{ display: 'block', marginBottom: '5px' }}>Gewicht (kg):</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="Gewicht in kg eingeben"
                                required
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#444', color: 'white', borderRadius: '8px', border: '1px solid #555' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="height" style={{ display: 'block', marginBottom: '5px' }}>Größe (cm):</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                placeholder="Größe in cm eingeben"
                                required
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#444', color: 'white', borderRadius: '8px', border: '1px solid #555' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Alter:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Alter eingeben"
                                required
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#444', color: 'white', borderRadius: '8px', border: '1px solid #555' }}
                            />
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                style={{ width: '100%', padding: '12px', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
                            >
                                Berechnen
                            </button>
                        </div>
                    </form>

                    {error && <p style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>{error}</p>}
                    {result && <p style={{ marginTop: '20px', fontWeight: 'bold', textAlign: 'center' }}>{result}</p>}
                </div>
            ) : (
                // Wenn der Benutzer nicht eingeloggt ist, Fehlermeldung anzeigen
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#ff3b30', marginTop: '0px' }}>{loginError}</p>
            )}
        </>
    );
};

export default HealthForm;
