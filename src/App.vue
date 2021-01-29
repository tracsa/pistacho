<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">Pistacho</h1>
      <p class="lead">A simple process builder for <a :href="cacahuateUrl">cacahuate</a></p>
    </div>
    <app-hello-world msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cacahuateUrl: 'https://github.com/tracsa/cacahuate',
    };
  }
};
</script>
