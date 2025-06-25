
<template>
  <main>
    <h1>Test</h1>

    <input
      class="input"
      type="email"
      placeholder="Email"
      v-model="email"
      />
    <input
      class="input"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <button
      class="button"
      @click="login">
      Login
    </button>


  </main>

</template>

<script setup  lang="ts">
import { ref, watch } from 'vue'

// Reactive Variablen mit ref()
const email = ref('')
const password = ref('')

// Watcher für email
watch(email, (value) => {
  console.log("Email has changed into:", value)
})


</script>



<style scoped>
main {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
input {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #42b983;
  color: #fff;
}

</style>
