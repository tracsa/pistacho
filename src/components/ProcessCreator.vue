<template>
  <div class="container p-0">
    <div class="row no-gutters mb-3">
      <div class="col">
        <h2 class="text-center">Create a process</h2>

        <component
          :is="editingProcess ? 'app-process-edit' : 'app-process-view'"
          :process="process"
        />

        <div class="btn-group float-right">
          <button type="button"
            class="btn btn-outline-success"
            @click="editingProcess = false"
            v-if="editingProcess"
          >
            <font-awesome-icon :icon="['fas', 'save']"/>
          </button>

          <button type="button"
            class="btn btn-outline-primary"
            @click="editingProcess = true"
            v-else
          >
            <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
          </button>

          <button type="button"
            class="btn btn-outline-primary"
            :disabled="editingProcess === true"
          >
            <font-awesome-icon :icon="['fas', 'upload']"/>
          </button>

          <button type="button"
            class="btn btn-outline-primary"
            :disabled="editingProcess === true"
          >
            <font-awesome-icon :icon="['fas', 'file-export']"/>
          </button>
        </div>
      </div>
    </div>

    <hr class="my-4"/>

    <div class="row no-gutters mb-3">
      <div class="col text-center">
        <div class="card bg-success text-white">
          <div class="card-body">
            <div class="card-text">
              <font-awesome-icon :icon="['fas', 'flag']" class="mr-1"/>
              <span>Start Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <span
      v-for="(node,i) in nodes"
      :key="i"
    >
      <div class="row no-gutters mb-3"
        v-if="i < nodes.length"
      >
        <div class="col text-center">
          <font-awesome-icon :icon="['fas', 'arrow-down']"/>
        </div>
      </div>

      <div class="row no-gutters mb-3">
        <div class="col">
          <component
            :is="i === editedNode ? 'app-node-edit' : 'app-node-view'"
            :node="node"
          />

          <div class="btn-group float-right">
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === 0"
              @click="moveNode(i, 0)"
            >
              <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === 0"
              @click="moveNode(i, i-1)"
            >
              <font-awesome-icon :icon="['fas', 'chevron-up']"/>
            </button>

            <button type="button"
              class="btn btn-outline-success"
              @click="editedNode = null"
              v-if="i === editedNode"
            >
              <font-awesome-icon :icon="['fas', 'save']"/>
            </button>
            <button type="button"
              class="btn btn-outline-primary"
              @click="editedNode = i"
              v-else
            >
              <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
            </button>

            <button type="button"
              class="btn btn-outline-danger"
              :disabled="nodes.length === 1"
              @click="deleteNode(i)"
            >
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === nodes.length - 1"
              @click="moveNode(i, i+1)"
            >
              <font-awesome-icon :icon="['fas', 'chevron-down']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary"
              :disabled="i === nodes.length - 1"
              @click="moveNode(i, nodes.length - 1)"
            >
              <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
            </button>
          </div>
        </div>
      </div>
    </span>

    <div class="row no-gutters mb-3">
      <div class="col">
        <button
          type="button"
          class="btn btn-primary w-100"
          @click.prevent="appendNode()"
        >
          <font-awesome-icon :icon="['fas', 'plus']"/>
          <span class="ml-1">Add node</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      process: {
        title: 'A brand new process to know about you',
        description: 'A basic process to ask about one\'s personal life.',
      },

      nodes: [
        {
          type: 'action',
          title: 'Personal information',
          description: 'Start a new process by doing this task. Tell us about you.',
          forms: [
            {
              inputs: [
                {
                  type: 'text',
                  label: 'Your name',
                  helpText: 'A simple input. Just enter your name',
                },
              ],
            },
            {
              inputs: [
                {
                  type: 'text',
                  label: 'What do you like to do?',
                  helpText: 'Write whatever you like',
                },
                {
                  type: 'select',
                  label: 'Which currency do you use more often?',
                  helpText: 'Choose any option',
                  options: [
                    {
                      label: 'Peso mexicano',
                      value: 'MXN',
                    },
                    {
                      label: 'US dolar',
                      value: 'USD',
                    },
                    {
                      label: 'Euro',
                      value: 'EUR',
                    },
                  ],
                },
              ],
            },
          ],
        }
      ],

      editedNode: null,
      editingProcess: false,

      defaultNode: {
        type: 'action',
        title: 'New amazing node',
        description: 'A simple node',
        forms: [
          {
            inputs: [
              {
                type: 'text',
                label: 'Basic text input',
                helpText: 'Enter some random text',
              },
              {
                type: 'select',
                label: 'Basic selector input',
                helpText: 'Choose any option',
                options: [
                  {
                    label: 'First option',
                    value: 1,
                  },
                  {
                    label: 'Second option',
                    value: 2,
                  },
                  {
                    label: 'Another option',
                    value: 'another',
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },

  methods: {
    appendNode() {
      const vm = this;

      vm.nodes.push(vm.defaultNode);
      vm.editedNode = vm.nodes.length - 1;
    },

    deleteNode(index) {
      const vm = this;

      vm.nodes.splice(index, 1);
    },

    moveNode(from, to) {
      this.move(this.nodes, from, to);
    },

    // Utility
    move(arr, from, to) {
      const elm = arr.splice(from, 1)[0];
      arr.splice(to, 0, elm);
    },
  },
};
</script>
