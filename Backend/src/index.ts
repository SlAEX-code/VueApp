import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port = 3000; // Port für das Backend

// Middleware
app.use(cors()); // Erlaubt Cross-Origin-Anfragen (wichtig für die Entwicklung)
app.use(express.json()); // Ermöglicht das Parsen von JSON im Request-Body

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}

let todos: ToDo[] = [
    { id: 1, text: 'Vue.js lernen', completed: false },
    { id: 2, text: 'Node.js Backend bauen', completed: false },
    { id: 3, text: 'Full-Stack-App fertigstellen', completed: false },
]
let nextId = 4;

app.get('/api/todos', (req: Request, res: Response) => {
    res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
    const newTodoData = req.body;
    if(!newTodoData.text || typeof newTodoData.text !== 'string') {
       res.status(400).json({ error: 'Bitte geben Sie einen Text an.' });
       return;
    }

    const newTodo: ToDo = {
        id: nextId++,
        text: newTodoData.text,
        completed: false,
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);

    if (todos.length === initialLength) {
        res.status(404).json({error: 'Todo not found'});
        return;
    }

    res.status(204).send();
});

// 4. Ein To-Do aktualisieren (UPDATE)
app.put('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const todoToUpdate = todos.find(todo => todo.id === id);

    if (!todoToUpdate) {
        res.status(404).json({ error: 'Todo not found' });
        return;
    }

    // Wir erlauben nur, den 'completed'-Status zu ändern
    if (typeof req.body.completed !== 'boolean') {
        res.status(400).json({ error: 'Completed must be a boolean.' });
        return;
    }

    todoToUpdate.completed = req.body.completed;
    res.json(todoToUpdate);
});



// Server starten
app.listen(port, () => {
    console.log(`[server]: Server läuft auf http://localhost:${port}`);
});