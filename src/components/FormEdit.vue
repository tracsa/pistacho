<template>
  <div>
    <div v-for="input,j in form.inputs"
      :key="j"
    >
      <hr class="my-3" v-if="j !== 0">

      <label>Label</label>
      <input class="form-control"
        v-model="input.label"
      />

      <label>Type</label>
      <select class="custom-select"
        v-model="input.type"
      >
        <option
          v-for="option,k in inputTypes"
          :key="k"
          :value="option"
        >{{ option }}</option>
      </select>

      <label>Help text</label>
      <input class="form-control"
        v-model="input.helpText"
      />
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

  data() {
    return {
      inputTypes: [
        'text',
        'date',
        'datetime',
        'select',
      ],
    };
  },
};
</script>
