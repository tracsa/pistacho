<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">
        <span>Pistacho</span>
        <a :href="pistachoGithubUrl" class="mx-1">
          <font-awesome-icon :icon="['fab', 'github']"/>
        </a>
      </h1>

      <hr class="my-4"/>

      <p class="lead">A simple process creation tool for <span class="font-weight-bold">Cacahuate</span>

        <a :href="cacahuateHomeUrl" class="mx-1">
          <font-awesome-icon :icon="['fas', 'home']"/>
        </a>

        <a :href="cacahuateGithubUrl" class="mx-1">
          <font-awesome-icon :icon="['fab', 'github']"/>
        </a>
      </p>
    </div>

    <app-process-creator/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pistachoGithubUrl: 'https://www.github.com/tracsa/pistacho',
      cacahuateHomeUrl: 'https://tracsa.github.io/cacahuate',
      cacahuateGithubUrl: 'https://www.github.com/tracsa/cacahuate',
    };
  }
};
</script>
