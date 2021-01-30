<template>
  <div>
    <div v-for="input,inputIter in form.inputs"
      :key="inputIter"
    >
      <hr class="my-3" v-if="inputIter !== 0">

      <app-input-edit :input="input"/>

      <div class="text-right">
        <div class="btn-group">
          <button type="button"
            class="btn btn-outline-primary text-dark"
            :disabled="inputIter === 0"
            @click="moveInput(inputIter, 0)"
          >
            <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
          </button>
          <button type="button"
            class="btn btn-outline-primary text-dark"
            :disabled="inputIter === 0"
            @click="moveInput(inputIter, inputIter-1)"
          >
            <font-awesome-icon :icon="['fas', 'chevron-up']"/>
          </button>

          <button type="button"
            class="btn btn-outline-danger text-dark"
            :disabled="form.inputs.length === 1"
            @click="deleteInput(inputIter)"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
          </button>

          <button type="button"
            class="btn btn-outline-primary text-dark"
            :disabled="inputIter === form.inputs.length - 1"
            @click="moveInput(inputIter, inputIter+1)"
          >
            <font-awesome-icon :icon="['fas', 'chevron-down']"/>
          </button>
          <button type="button"
            class="btn btn-outline-primary text-dark"
            :disabled="inputIter === form.inputs.length - 1"
            @click="moveInput(inputIter, form.inputs.length - 1)"
          >
            <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
          </button>

          <button
            type="button"
            class="btn btn-outline-primary text-dark"
            @click="appendInput()"
            v-if="inputIter === form.inputs.length - 1"
          >
            <font-awesome-icon :icon="['fas', 'plus']"/>
            <span class="ml-1">Add another input</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    form: {
      required: true,
    },
  },

  data() {
    return {
      defaultInput: {
        type: 'text',
        label: 'Basic text input',
        helpText: 'Enter some random text',
      },
    };
  },

  methods: {
    appendInput() {
      const vm = this;

      vm.form.inputs.push(_.cloneDeep(vm.defaultInput));
    },

    deleteInput(index) {
      const vm = this;

      vm.form.inputs.splice(index, 1);
    },

    moveInput(fromIndex, toIndex) {
      this.move(this.form.inputs, fromIndex, toIndex);
    },

    // Utility
    // TODO: Dry. Move to a helper file
    move(arr, fromIndex, toIndex) {
      arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
    },
  },
};
</script>
