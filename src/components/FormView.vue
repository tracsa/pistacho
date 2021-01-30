<template>
  <div>
    <small class="text-muted ml-1">Inputs</small><br/>
    <div v-for="input,inputIter in form.inputs"
      :key="inputIter"
      class="border-left border-secondary pl-2 mb-3"
    >
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
