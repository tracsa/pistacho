<template>
  <div>
    <div v-for="input,inputIter in form.inputs"
      :key="inputIter"
    >
      <hr class="my-3" v-if="inputIter !== 0">

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
