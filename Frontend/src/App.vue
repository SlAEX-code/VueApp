<script setup lang="ts">
// Schritt 1: Importiere 'ref' von Vue, um einen reaktiven Zustand zu erstellen
import { ref } from 'vue';

// Schritt 2: Erstelle eine reaktive Variable, um die Nachricht vom Backend zu speichern
const backendMessage = ref<string>('Noch keine Daten vom Backend geladen.');
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

// Schritt 3: Definiere eine Funktion, die die Daten abruft
async function fetchDataFromBackend() {
  // Setze den Ladezustand und lösche alte Fehler
  isLoading.value = true;
  error.value = null;
  backendMessage.value = 'Lade Daten...';

  try {
    // Sende eine Anfrage an die Backend-API.
    // Dank des Vite-Proxys können wir den relativen Pfad '/api' verwenden.
    const response = await fetch('/api');

    // Prüfe, ob die Anfrage erfolgreich war (HTTP-Status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    // Wandle die Antwort in JSON um
    const data = await response.json();

    // Aktualisiere unsere reaktive Variable mit der Nachricht aus dem Backend
    backendMessage.value = data.message;

  } catch (e: any) {
    // Fange mögliche Fehler (Netzwerkprobleme, etc.) ab
    console.error('Fehler beim Abrufen der Daten:', e);
    error.value = 'Kommunikation mit dem Backend fehlgeschlagen.';
    backendMessage.value = 'Laden der Daten fehlgeschlagen.';
  } finally {
    // Setze den Ladezustand zurück, egal ob erfolgreich oder nicht
    isLoading.value = false;
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <h1>Frontend-Backend-Kommunikationstest</h1>
    <div class="card">
      <button @click="fetchDataFromBackend" :disabled="isLoading">
        {{ isLoading ? 'Lade...' : 'Daten vom Backend abrufen' }}
      </button>
      <p>
        <strong>Antwort vom Backend:</strong>
      </p>
      <p class="message" :class="{ 'error-message': error }">
        {{ backendMessage }}
      </p>
      <p v-if="error" class="error-message">
        <strong>Fehlerdetails:</strong> {{ error }}
      </p>
    </div>
  </main>
</template>

<style scoped>
/* Stelle sicher, dass header und main untereinander angezeigt werden */
header {
  display: block;
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

main {
  display: block;
  width: 100%;
  font-family: sans-serif;
  text-align: center;
  margin-top: 40px;
}

.card {
  padding: 2em;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 500px;
  margin: 20px auto;
}

button {
  font-size: 1em;
  padding: 0.5em 1em;
  cursor: pointer;
  margin-bottom: 20px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.message {
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  color: #333;
}

.error-message {
  color: #d8000c;
  font-weight: bold;
}
</style>
