<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/test">Test</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
#app {
  min-height: 100vh;
}

nav {
  padding: 20px;
  background-color: var(--color-background-soft);
  border-bottom: 1px solid #ddd;
}

nav a {
  margin-right: 20px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-active {
  color: #42b983;
  text-shadow: white 0 0 10px;
}
</style>
