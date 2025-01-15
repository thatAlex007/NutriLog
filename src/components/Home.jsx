import React from 'react';
import logo from '../assets/logonutri.png'; // Der Pfad zum Bild

const Home = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <img src={logo} alt="NutriLog Logo" style={styles.logo} />
            </header>
            <main style={styles.mainContent}>
                <p style={styles.introText}>
                    Willkommen auf unserer Website – deinem umfassenden Fitness- und Ernährungsbegleiter! Wir bieten dir eine Vielzahl an nützlichen Tools, um deine Gesundheitsziele zu erreichen und deine Fortschritte zu verfolgen.
                </p>
                <ul style={styles.featuresList}>
                    <li style={styles.featureItem}>
                        <span style={styles.featureTitle}>KalorienTracker:</span>
                        <span style={styles.featureDescription}> Behalte deine Nahrungsaufnahme im Blick und verfolge deine Kalorienzufuhr einfach und schnell.</span>
                    </li>
                    <li style={styles.featureItem}>
                        <span style={styles.featureTitle}>Trainingsplaner:</span>
                        <span style={styles.featureDescription}> Stelle deinen individuellen Trainingsplan zusammen und erreiche deine Fitnessziele effizient.</span>
                    </li>
                    <li style={styles.featureItem}>
                        <span style={styles.featureTitle}>Gesamtumsatzrechner:</span>
                        <span style={styles.featureDescription}> Berechne deinen Gesamtumsatz basierend auf deinem Alter, Gewicht, Größe und Geschlecht.</span>
                    </li>
                    <li style={styles.featureItem}>
                        <span style={styles.featureTitle}>Rezeptliste:</span>
                        <span style={styles.featureDescription}> Speichere gesunde, leckere Rezepte, die zu deinem Ernährungsplan passen und dir helfen, dich optimal zu ernähren.</span>
                    </li>
                </ul>
                <p style={styles.closingText}>
                    Unser Ziel ist es, dir zu helfen, deine Fitnessreise auf eine einfache, nachhaltige und motivierende Weise zu gestalten. Ob du abnehmen, Muskeln aufbauen oder einfach gesünder leben möchtest – wir unterstützen dich auf jedem Schritt des Weges!
                </p>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '74vh',
        backgroundColor: '#333',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '0 2rem',
        textAlign: 'center',
    },
    header: {
        textAlign: 'center',
        marginBottom: '5px',
    },
    logo: {
        width: '800px', // Bildbreite anpassen
        height: 'auto', // Höhe automatisch anpassen
    },
    mainContent: {
        marginTop: '-15px',
    },
    introText: {
        fontSize: '1.3rem',
        marginBottom: '15px',
    },
    featuresList: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        textAlign: 'center',
        marginBottom: '20px',
        lineHeight: '1.6',
    },
    featureItem: {
        marginBottom: '10px',
        display: 'inline-block',
        maxWidth: '80%',
        textAlign: 'left',
    },
    featureTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
    },
    featureDescription: {
        fontSize: '1rem',
        fontWeight: '400',
    },
    closingText: {
        fontSize: '1.1rem',
        fontWeight: '500',
    },
};

export default Home;
