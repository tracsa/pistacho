<template>
  <div>
    <div v-for="input,i in form.inputs"
      :key="i"
    >
      <hr class="my-3" v-if="i !== 0">

      <app-input-view :input="input"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      required: true,
    },
  },
};
</script>
