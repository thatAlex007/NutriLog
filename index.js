import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nutrilog',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Authentication Routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT password FROM u_user WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Error querying the database' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const hashedPassword = results[0].password;

        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                return res.json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return res.status(500).json({ message: 'Error during password verification' });
        }
    });
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-Mail und Passwort werden benötigt.' });
    }

    db.query('SELECT * FROM u_user WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.error('Datenbankfehler:', err);
            return res.status(500).json({ message: 'Fehler bei der Anmeldung.' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'E-Mail ist bereits registriert.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query('INSERT INTO u_user (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
                if (err) {
                    console.error('Datenbankfehler beim Einfügen:', err);
                    return res.status(500).json({ message: 'Fehler bei der Anmeldung.' });
                }

                res.status(201).json({ message: 'Benutzer erfolgreich registriert.' });
            });
        } catch (error) {
            console.error('Fehler beim Verschlüsseln des Passworts:', error);
            return res.status(500).json({ message: 'Fehler bei der Passwortverschlüsselung.' });
        }
    });
});

// User Management Routes
app.post('/save-gur', (req, res) => {
    const { email, gur } = req.body;

    if (isNaN(gur)) {
        return res.status(400).json({ message: 'Invalid gur value' });
    }

    const query = 'UPDATE u_user SET gur = ? WHERE email = ?';
    db.query(query, [gur, email], (err, result) => {
        if (err) {
            console.error('Error updating gur:', err);
            return res.status(500).json({ message: 'Error updating gur' });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Gur value updated successfully' });
        }

        return res.status(404).json({ message: 'User not found' });
    });
});

app.get('/get-gur', (req, res) => {
    const { email } = req.query;

    const query = 'SELECT gur FROM u_user WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Error retrieving gur' });
        }

        if (results.length > 0) {
            return res.json({ gur: results[0].gur });
        }

        return res.status(404).json({ message: 'User not found' });
    });
});

// Product Management Routes
app.get('/get-products', (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const query = 'SELECT k_produkt AS name, k_kalorien AS calories FROM k_kalorientracker WHERE k_u_email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.post('/add-product', (req, res) => {
    const { email, product, calories } = req.body;
    if (!email || !product || !calories) {
        return res.status(400).json({ error: 'Email, product, and calories are required' });
    }

    const query = 'INSERT INTO k_kalorientracker (k_produkt, k_kalorien, k_u_email) VALUES (?, ?, ?)';
    db.query(query, [product, calories, email], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product added successfully' });
    });
});

app.delete('/remove-product', (req, res) => {
    const { email, product } = req.body;

    if (!email || !product) {
        return res.status(400).json({ message: 'Email und Produktname werden benötigt.' });
    }

    const query = 'DELETE FROM k_kalorientracker WHERE k_u_email = ? AND k_produkt = ?';
    db.query(query, [email, product], (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen des Produkts:', err);
            return res.status(500).json({ message: 'Fehler beim Löschen des Produkts.' });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Produkt erfolgreich gelöscht.' });
        }

        return res.status(404).json({ message: 'Produkt nicht gefunden.' });
    });
});

app.delete('/reset-day', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email wird benötigt' });
    }

    const query = 'DELETE FROM k_kalorientracker WHERE k_u_email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen der Produkte:', err);
            return res.status(500).json({ message: 'Fehler beim Löschen der Produkte' });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Alle Produkte erfolgreich gelöscht' });
        }

        return res.status(404).json({ message: 'Benutzer oder Produkte nicht gefunden' });
    });
});

// Recipe Management Routes
app.get('/get-recipes', (req, res) => {
    const { email } = req.query;
    const query = 'SELECT * FROM r_recipe WHERE r_u_email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ message: 'Failed to fetch recipes.' });
        }

        res.json(results);
    });
});

app.post('/add-recipe', (req, res) => {
    const { r_u_email, r_title, r_desc } = req.body;
    const query = 'INSERT INTO r_recipe (r_u_email, r_title, r_desc) VALUES (?, ?, ?)';
    db.query(query, [r_u_email, r_title, r_desc], (err, result) => {
        if (err) {
            console.error('Error adding recipe:', err);
            return res.status(500).json({ message: 'Failed to add recipe.' });
        }

        res.json({ r_nr: result.insertId, r_u_email, r_title, r_desc });
    });
});

app.put('/edit-recipe', (req, res) => {
    const { id, r_title, r_desc } = req.body;
    const query = 'UPDATE r_recipe SET r_title = ?, r_desc = ? WHERE r_nr = ?';
    db.query(query, [r_title, r_desc, id], (err) => {
        if (err) {
            console.error('Error editing recipe:', err);
            return res.status(500).json({ message: 'Failed to edit recipe.' });
        }

        res.status(200).send();
    });
});

app.delete('/remove-recipe', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM r_recipe WHERE r_nr = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error removing recipe:', err);
            return res.status(500).json({ message: 'Failed to remove recipe.' });
        }

        res.status(200).send();
    });
});

// Training Plan Management Routes
app.post('/add-exercise', (req, res) => {
    const { t_u_email, t_day, t_exercise } = req.body;

    if (!t_u_email || !t_day || !t_exercise) {
        return res.status(400).json({ message: 'Email, day, and exercise are required' });
    }

    const query = 'INSERT INTO t_trainingsplan (t_u_email, t_day, t_exercise) VALUES (?, ?, ?)';
    db.query(query, [t_u_email, t_day, t_exercise], (err, result) => {
        if (err) {
            console.error('Error adding exercise:', err);
            return res.status(500).json({ message: 'Error adding exercise' });
        }

        return res.status(201).json({
            message: 'Exercise added successfully',
            exerciseId: result.insertId,
        });
    });
});

app.get('   ', (req, res) => {
    const { t_u_email } = req.query;

    if (!t_u_email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const query = 'SELECT t_day, t_exercise FROM t_trainingsplan WHERE t_u_email = ?';
    db.query(query, [t_u_email], (err, results) => {
        if (err) {
            console.error('Error fetching plan:', err);
            return res.status(500).json({ message: 'Error fetching plan' });
        }

        const plan = {
            Montag: [],
            Dienstag: [],
            Mittwoch: [],
            Donnerstag: [],
            Freitag: [],
            Samstag: [],
            Sonntag: [],
        };

        results.forEach(row => {
            if (plan[row.t_day]) {
                plan[row.t_day].push(row.t_exercise);
            }
        });

        return res.json(plan);
    });
});

app.delete('/remove-exercise', (req, res) => {
    const { t_u_email, t_day, t_exercise } = req.body;
  
    if (!t_u_email || !t_day || !t_exercise) {
      return res.status(400).json({ message: 'Fehlende Parameter' });
    }
  
    const query = `
      DELETE FROM t_trainingsplan 
      WHERE t_u_email = ? AND t_day = ? AND t_exercise = ?
    `;
  
    db.query(query, [t_u_email, t_day, t_exercise], (err, result) => {
      if (err) {
        console.error('Error removing exercise:', err);
        return res.status(500).json({ message: 'Fehler beim Entfernen der Übung' });
      }
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Übung erfolgreich entfernt' });
      } else {
        return res.status(404).json({ message: 'Übung nicht gefunden' });
      }
    });
  });
  
// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
