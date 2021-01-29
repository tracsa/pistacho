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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    updateNodeType(e) {
      const vm = this;
      if (e.target.value === 'action') {
        if (!vm.node.forms) {
          vm.node.forms = [{
            ...vm.defaultForm
          }];
        }
      } else if (vm.node.forms) {
        delete vm.node.forms;
      }
    },
  },
};
</script>
