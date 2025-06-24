import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port = 3000; // Port für das Backend

// Middleware
app.use(cors()); // Erlaubt Cross-Origin-Anfragen (wichtig für die Entwicklung)
app.use(express.json()); // Ermöglicht das Parsen von JSON im Request-Body

// Eine einfache Test-Route
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Hallo vom Node.js/Express-Backend!' });
});

// Server starten
app.listen(port, () => {
    console.log(`[server]: Server läuft auf http://localhost:${port}`);
});