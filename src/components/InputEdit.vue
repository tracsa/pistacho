<template>
  <div>
      <label>Label</label>
      <input class="form-control"
        v-model="input.label"
      />

      <label>Type</label>
      <select class="custom-select"
        v-model="input.type"
        @change="updateInputType($event)"
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

          <div class="text-right">
            <div class="btn-group">
              <button type="button"
                class="btn btn-outline-warning text-dark"
                :disabled="k === 0"
                @click="moveOption(i, 0)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
              </button>
              <button type="button"
                class="btn btn-outline-warning text-dark"
                :disabled="k === 0"
                @click="moveOption(k, k-1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-up']"/>
              </button>

              <button type="button"
                class="btn btn-outline-danger text-dark"
                :disabled="input.options.length === 1"
                @click="deleteOption(k)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
              </button>
              <button type="button"
                class="btn btn-outline-warning text-dark"
                :disabled="k === input.options.length - 1"
                @click="moveOption(k, k+1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-down']"/>
              </button>
              <button type="button"
                class="btn btn-outline-warning text-dark"
                :disabled="k === input.options.length - 1"
                @click="moveOption(k, input.options.length - 1)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
              </button>

              <button
                type="button"
                class="btn btn-outline-warning text-dark"
                @click="appendOption()"
                v-if="k === input.options.length - 1"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                <span class="ml-1">Add option</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    input: {
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
        'radio',
        'checkbox',
      ],

      defaultOption: {
        label: 'Default option',
        value: 'something',
      },
    };
  },

  methods: {
    appendOption() {
      const vm = this;

      vm.input.options.push(_.cloneDeep(vm.defaultOption));
    },

    deleteOption(index) {
      const vm = this;

      vm.input.options.splice(index, 1);
    },

    updateInputType(e) {
      const vm = this;

      if (['select', 'radio', 'checkbox'].includes(e.target.value)) {
        if (!vm.input.options) {
          vm.input.options = [_.cloneDeep(vm.defaultOption)];
        }
      } else if (vm.input.options) {
        delete vm.input.options;
      }
    },

    moveOption(fromIndex, toIndex) {
      this.move(this.input.options, fromIndex, toIndex);
    },

    // Utility
    // TODO: Dry. Move to a helper file
    move(arr, fromIndex, toIndex) {
      arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
    },
  },
};
</script>
