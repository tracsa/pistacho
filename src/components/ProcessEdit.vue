<template>
  <div class="card border-dark w-100">
    <div class="card-body">
      <div class="card-title">
        <label>Title</label>
        <input class="form-control"
          v-model="process.title"
        />

        <hr/>

        <label>Description</label>
        <input class="form-control"
          v-model="process.description"
        />
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
