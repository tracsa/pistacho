<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <h2>Create a process</h2>

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Process info</h5>
            <span>Title: "{{ processTitle }}"</span>
            <br/>
            <span>Node count: {{ nodes.length }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3"
      v-for="(node,i) in nodes"
      :key="i"
    >
      <div class="col">
        <div class="d-flex justify-content-between">
          <component class="mr-3" :is="'app-node-view'" :node="node"/>

          <div class="btn-group-vertical">
            <button type="button" 
              class="btn btn-outline-secondary">
              <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary">
              <font-awesome-icon :icon="['fas', 'chevron-up']"/>
            </button>
            <button type="button"
              class="btn btn-outline-primary">
              <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
            </button>
            <button type="button" 
              class="btn btn-outline-danger">
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary">
              <font-awesome-icon :icon="['fas', 'chevron-down']"/>
            </button>
            <button type="button"
              class="btn btn-outline-secondary">
              <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
            </button>
          </div>
        </div>
      </div>
    </div>

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
      processTitle: 'New awesome process',
      nodes: [
        {
          type: 'action',
          title: 'First step',
          description: 'Start a new process by doing this task',
        }
      ],
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
    }
  },
};
</script>
