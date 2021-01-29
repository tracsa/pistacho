<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">Pistacho</h1>
      <p class="lead">
        <span>A simple process builder for </span>
        <a :href="cacahuateDocsUrl">cacahuate</a>
        <span> (check it out on <a :href="cacahuateGithubUrl">github</a>)</span>
      </p>
    </div>

    <app-process-creator/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cacahuateDocsUrl: 'https://tracsa.github.io/cacahuate',
      cacahuateGithubUrl: 'https://www.github.com/tracsa/cacahuate',
    };
  }
};
</script>
