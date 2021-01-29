<template>
  <div class="card border-dark">
    <div class="card-body">
      <div class="card-title">
        <small class="text-muted">Title</small><br/>
        <h5>{{ process.title }}</h5>

        <hr/>

        <small class="text-muted">Description</small><br/>
        <span>{{ process.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    process: {
      required: true,
    },
  },
};
</script>
