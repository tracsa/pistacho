<template>
  <div class="card border-dark w-100">
    <div class="card-body">
      <div class="card-title">
        <mdb-input
          label="Title"
          v-model="process.title"
        />

        <hr/>

        <mdb-input
          label="Description"
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
