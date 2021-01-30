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
            v-for="option,optionIter in nodeTypes"
            :key="optionIter"
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
        <div v-for="form,formIter in node.forms"
          :key="formIter"
          class="border-left border-info pl-2 mb-3"
        >
          <app-form-edit :form="form"/>

          <div class="text-right">
            <div class="btn-group">
              <button type="button"
                class="btn btn-outline-info text-dark"
                :disabled="formIter === 0"
                @click="moveForm(formIter, 0)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
              </button>
              <button type="button"
                class="btn btn-outline-info text-dark"
                :disabled="formIter === 0"
                @click="moveForm(formIter, formIter-1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-up']"/>
              </button>

              <button type="button"
                class="btn btn-outline-danger text-dark"
                :disabled="node.forms.length === 1"
                @click="deleteForm(formIter)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
              </button>

              <button type="button"
                class="btn btn-outline-info text-dark"
                :disabled="formIter === node.forms.length - 1"
                @click="moveForm(formIter, formIter+1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-down']"/>
              </button>
              <button type="button"
                class="btn btn-outline-info text-dark"
                :disabled="formIter === node.forms.length - 1"
                @click="moveForm(formIter, node.forms.length - 1)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
              </button>

              <button
                type="button"
                class="btn btn-outline-info text-dark"
                @click="appendForm()"
                v-if="formIter === node.forms.length - 1"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                <span class="ml-1">Add another form</span>
              </button>
            </div>
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
