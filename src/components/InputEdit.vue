<template>
  <div>
      <mdb-input
        label="Label"
        v-model="input.label"
      />

      <label>Type</label>
      <select class="browser-default custom-select"
        v-model="input.type"
        @change="updateInputType($event)"
      >
        <option
          v-for="option,optionIter in inputTypes"
          :key="optionIter"
          :value="option"
        >{{ option }}</option>
      </select>

      <mdb-input
        label="Help text"
        v-model="input.helpText"
      />

      <div v-if="input.options" class="mt-2">
        <small class="text-muted ml-1">Options:</small><br/>
        <div v-for="option,optionIter in input.options"
          :key="optionIter"
          class="border-left border-bottom border-warning pl-2 mb-3"
        >
          <mdb-input
            label="Label"
            v-model="option.label"
          />

          <mdb-input
            label="Value"
            v-model="option.value"
          />

          <div class="text-right">
            <mdb-btn-group size="sm">
              <button
                type="button"
                class="btn btn-warning"
                @click="appendOption()"
                v-if="optionIter === input.options.length - 1"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                <span class="ml-1">Add option</span>
              </button>

              <button type="button"
                class="btn btn-warning"
                :disabled="optionIter === 0"
                @click="moveOption(i, 0)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
              </button>
              <button type="button"
                class="btn btn-warning"
                :disabled="optionIter === 0"
                @click="moveOption(optionIter, optionIter-1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-up']"/>
              </button>

              <button type="button"
                class="btn btn-warning"
                :disabled="optionIter === input.options.length - 1"
                @click="moveOption(optionIter, optionIter+1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-down']"/>
              </button>
              <button type="button"
                class="btn btn-warning"
                :disabled="optionIter === input.options.length - 1"
                @click="moveOption(optionIter, input.options.length - 1)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
              </button>

              <button type="button"
                class="btn btn-danger"
                :disabled="input.options.length === 1"
                @click="deleteOption(optionIter)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
              </button>
            </mdb-btn-group>
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
