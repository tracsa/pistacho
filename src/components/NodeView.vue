<template>
  <div class="card w-100">
    <div class="card-body">

      <div class="card-title">
        <small class="text-muted">Title</small><br/>
        <h5>{{ node.title }}</h5>
      </div>

      <hr/>

      <small class="text-muted">Description</small><br/>
      <p class="card-text">
        <span>{{ node.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: {
      required: true,
    }
  },
};
</script>
