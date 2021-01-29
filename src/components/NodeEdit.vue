<template>
  <div class="card border-secondary w-100">
    <div class="card-body">

      <div class="card-title">
        <label>Title</label>
        <input class="form-control"
          v-model="node.title"
        />
      </div>

      <hr/>

      <label>Description</label>
      <input class="form-control"
        v-model="node.description"
      />
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
