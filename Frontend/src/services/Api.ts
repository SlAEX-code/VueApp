// frontend/src/services/Api.ts

import axios, { type AxiosInstance } from 'axios';
import type {ToDo} from "@/models/Todos.ts";



// Die Service-Klasse, die unsere API-Methoden kapselt
class ApiService {
  // Eine private Eigenschaft, die die konfigurierte axios-Instanz hält.
  // Sie ist nur innerhalb dieser Klasse sichtbar.
  private apiClient: AxiosInstance;

  constructor() {
    // Der Konstruktor wird beim Erstellen der Instanz aufgerufen.
    // Hier konfigurieren wir axios.
    this.apiClient = axios.create({
      baseURL: '/api',
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  // Jede API-Funktion wird zu einer public-Methode der Klasse.
  public async getTodos(): Promise<ToDo[]> {
    const response = await this.apiClient.get<ToDo[]>('/todos');
    return response.data;
  }

  public async createTodo(text: string): Promise<ToDo> {
    const response = await this.apiClient.post<ToDo>('/todos', { text });
    return response.data;
  }

  public async deleteTodo(id: number): Promise<void> {
    await this.apiClient.delete(`/todos/${id}`);
  }

  public async updateTodoStatus(id: number, completed: boolean): Promise<ToDo> {
    const response = await this.apiClient.put<ToDo>(`/todos/${id}`, { completed });
    return response.data;
  }
}

// Der entscheidende Schritt: Wir erstellen EINE EINZIGE Instanz der Klasse
// und exportieren diese. Das stellt sicher, dass unsere gesamte App dieselbe
// Instanz des ApiService verwendet (Singleton-Pattern).
export const api = new ApiService();
