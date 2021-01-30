<template>
  <div>
    <small class="text-muted">Type: <b>{{ input.type }}</b></small><br/>
    <span>{{ input.label }}</span><br/>
    <small class="text-muted">Help text: <i>"{{ input.helpText }}"</i></small><br/>

    <div v-if="input.options" class="mt-2">
      <small class="text-muted ml-1">Options:</small><br/>
      <div v-for="opt, k in input.options"
        :key="k"
        class="border-left border-warning pl-2 mb-3"
      >
        <span>{{ opt.label }}</span><br/>
        <small class="text-muted">{{ opt.value }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      required: true,
    },
  },
};
</script>
