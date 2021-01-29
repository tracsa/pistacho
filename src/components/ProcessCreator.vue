<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <h2 class="text-center">Create a process</h2>

        <div class="d-flex">
          <component class="mr-3"
            :is="editingProcess ? 'app-process-edit' : 'app-process-view'"
            :process="process"
          />

          <div>
            <div class="btn-group-vertical" style="width: 50px;">
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4"/>

    <div class="row mb-3">
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
      <div class="row mb-3"
        v-if="i < nodes.length"
      >
        <div class="col text-center">
          <font-awesome-icon :icon="['fas', 'arrow-down']"/>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <div class="d-flex justify-content-between">
            <component class="mr-3"
              :is="i === editedNode ? 'app-node-edit' : 'app-node-view'"
              :node="node"
            />

            <div>
              <div class="btn-group-vertical" style="width: 50px;">
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
        </div>
      </div>
    </span>

    <div class="row mb-3">
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
        title: 'A brand new process',
        description: 'A simple process definition',
      },

      nodes: [
        {
          type: 'action',
          title: 'First step',
          description: 'Start a new process by doing this task',
        }
      ],

      editedNode: null,
      editingProcess: false,
    };
  },

  methods: {
    appendNode() {
      const vm = this;

      vm.nodes.push({
        type: 'action',
        title: 'New amazing node',
        description: 'A simple node',
      });
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
