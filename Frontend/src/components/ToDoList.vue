<template>
  <main>
    <header>
      <img src="../assets/logo.svg" alt="Vue 3 Logo" style="height: 100px"/>
    </header>
    <h1>Meine To-Do-Liste</h1>

    <form @submit.prevent="handleAddTodo" class="add-form">
      <input
        type="text"
        v-model="newTodoText"
        placeholder="Neues To-Do hinzufügen..."
      />
      <button type="submit">Hinzufügen</button>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="handleToggleStatus(todo)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="handleDeleteTodo(todo.id)" class="delete-btn">×</button>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import type {ToDo} from "@/models/Todos.ts";
import {api} from '../services/Api.ts'

const todos = ref<ToDo[]>([]);
const newTodoText = ref('');

onMounted(async () => {
  try {
    todos.value = await api.getTodos();
  } catch (error) {
    console.error('Fehler beim Laden der To-Dos:', error);
  }
});

async function handleAddTodo() {
  if (newTodoText.value.trim() === '') {
    return;
  }

  try {
    const newTodo = await api.createTodo(newTodoText.value);
    todos.value.push(newTodo);
    newTodoText.value = '';
  } catch (error) {
    console.error('Fehler beim Erstellen des To-Dos:', error);
  }
}

async function handleDeleteTodo(id: number) {
  try {
    await api.deleteTodo(id);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error(`Fehler beim Löschen des To-Dos ${id}:`, error);
  }
}

async function handleToggleStatus(todoToUpdate: ToDo) {
  try {
    const updatedTodo = await api.updateTodoStatus(todoToUpdate.id, !todoToUpdate.completed);
    const index = todos.value.findIndex(t => t.id === todoToUpdate.id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
    }
  } catch (error) {
    console.error(`Fehler beim Aktualisieren des To-Dos ${todoToUpdate.id}:`, error);
  }
}
</script>

<style scoped>
main {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-form input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-form button {
  padding: 10px 15px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item span {
  flex-grow: 1;
}

.todo-item .completed {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  border: none;
  background: transparent;
  color: #ff3b30;
  font-size: 20px;
  cursor: pointer;
  visibility: hidden;
}

.todo-item:hover .delete-btn {
  visibility: visible;
}
</style>
