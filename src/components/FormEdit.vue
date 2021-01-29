<template>
  <div>
    <div v-for="input,i in form.inputs"
      :key="i"
    >
      <hr class="my-3" v-if="i !== 0">

      <label>Label</label>
      <input class="form-control"
        v-model="input.label"
      />

      <label>Type</label>
      <select class="custom-select"
        v-model="input.type"
        @change="updateInputType(i, $event)"
      >
        <option
          v-for="option,j in inputTypes"
          :key="j"
          :value="option"
        >{{ option }}</option>
      </select>

      <label>Help text</label>
      <input class="form-control"
        v-model="input.helpText"
      />

      <div v-if="input.options" class="mt-2">
        <small class="text-muted ml-1">Options:</small><br/>
        <div v-for="opt, k in input.options"
          :key="k"
          class="border-left border-warning pl-2 mb-3"
        >
          <label>Label</label>
          <input class="form-control"
            v-model="opt.label"
          />

          <label>Value</label>
          <input class="form-control"
            v-model="opt.value"
          />
        </div>
      </div>
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

      defaultOption: {
        label: 'Default option',
        value: 'something',
      },
    };
  },

  methods: {
    updateInputType(index, e) {
      const vm = this;

      if (['select', 'radio', 'checkbox'].includes(e.target.value)) {
        if (!vm.form.inputs[index].options) {
          vm.form.inputs[index].options = [vm.defaultOption];
        }
      } else if (vm.form.inputs[index].options) {
        delete vm.form.inputs[index].options;
      }
    },
  },
};
</script>
