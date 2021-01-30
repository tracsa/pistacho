<template>
  <div class="card border-secondary w-100">
    <div class="card-body">

      <div class="card-title">
        <label>Title</label>
        <input class="form-control"
          v-model="node.title"
        />

        <label>Type</label>
        <select class="custom-select"
          v-model="node.type"
          @change="updateNodeType($event)"
        >
          <option
            v-for="option,i in nodeTypes"
            :key="i"
            :value="option"
          >{{ option }}</option>
        </select>
      </div>

      <hr/>

      <label>Description</label>
      <input class="form-control"
        v-model="node.description"
      />

      <div v-if="node.forms">
        <hr/>
        <small class="text-muted ml-1">Forms</small><br/>
        <div v-for="form,i in node.forms"
          :key="i"
          class="border-left border-info pl-2 mb-3"
        >
          <app-form-edit :form="form"/>

          <div class="btn-group">
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === 0"
              @click="moveForm(i, 0)"
            >
              <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === 0"
              @click="moveForm(i, i-1)"
            >
              <font-awesome-icon :icon="['fas', 'chevron-up']"/>
            </button>

            <button type="button"
              class="btn btn-outline-danger"
              :disabled="node.forms.length === 1"
              @click="deleteForm(i)"
            >
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </button>

            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === node.forms.length - 1"
              @click="moveForm(i, i+1)"
            >
              <font-awesome-icon :icon="['fas', 'chevron-down']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === node.forms.length - 1"
              @click="moveForm(i, node.forms.length - 1)"
            >
              <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
            </button>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-info w-100"
          @click="appendForm()"
        >
          <font-awesome-icon :icon="['fas', 'plus']"/>
          <span class="ml-1">Add form</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    node: {
      required: true,
    }
  },

  data() {
    return {
      nodeTypes: [
        'action',
        'validation',
      ],

      defaultForm: {
        inputs: [
          {
            type: 'text',
            label: 'Basic text input',
            helpText: 'Enter some random text',
          },
        ],
      },
    };
  },

  methods: {
    appendForm() {
      const vm = this;

      vm.node.forms.push(_.cloneDeep(vm.defaultForm));
    },

    deleteForm(index) {
      const vm = this;

      vm.node.forms.splice(index, 1);
    },

    updateNodeType(e) {
      const vm = this;
      if (e.target.value === 'action') {
        if (!vm.node.forms) {
          vm.node.forms = [_.cloneDeep(vm.defaultForm)];
        }
      } else if (vm.node.forms) {
        delete vm.node.forms;
      }
    },

    moveForm(fromIndex, toIndex) {
      this.move(this.node.forms, fromIndex, toIndex);
    },

    // Utility
    // TODO: Dry. Move to a helper file
    move(arr, fromIndex, toIndex) {
      arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
    },
  },
};
</script>
