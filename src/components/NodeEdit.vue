<template>
  <div class="card border-info w-100">
    <div class="card-body px-3">

      <div class="card-title">
        <mdb-input
          label="Title"
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

      <mdb-input
        label="Description"
        v-model="node.description"
      />

      <div v-if="node.forms">
        <hr/>
        <small class="text-muted ml-1">Forms</small><br/>
        <div v-for="form,formIter in node.forms"
          :key="formIter"
          class="border-left border-bottom border-primary pl-2 mb-3"
        >
          <app-form-edit :form="form"/>

          <div class="text-right">
            <mdb-btn-group size="sm">
              <button
                type="button"
                class="btn btn-primary"
                @click="appendForm()"
                v-if="formIter === node.forms.length - 1"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                <span class="ml-1">Add form</span>
              </button>

              <button type="button"
                class="btn btn-primary"
                :disabled="formIter === 0"
                @click="moveForm(formIter, 0)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
              </button>
              <button type="button"
                class="btn btn-primary"
                :disabled="formIter === 0"
                @click="moveForm(formIter, formIter-1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-up']"/>
              </button>

              <button type="button"
                class="btn btn-primary"
                :disabled="formIter === node.forms.length - 1"
                @click="moveForm(formIter, formIter+1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-down']"/>
              </button>
              <button type="button"
                class="btn btn-primary"
                :disabled="formIter === node.forms.length - 1"
                @click="moveForm(formIter, node.forms.length - 1)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
              </button>

              <button type="button"
                class="btn btn-danger"
                :disabled="node.forms.length === 1"
                @click="deleteForm(formIter)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
              </button>
            </mdb-btn-group>
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
