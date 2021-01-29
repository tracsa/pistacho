<template>
  <div class="card border-secondary w-100">
    <div class="card-body">

      <div class="card-title">
        <small class="text-muted ml-1">Title</small><br/>
        <h5>{{ node.title }}</h5>

        <span>
          <font-awesome-icon :icon="['fas', 'clipboard-list']" class="mr-1"
            v-if="node.type === 'action'"
          />
          <font-awesome-icon :icon="['fas', 'clipboard-check']" class="mr-1"
            v-else-if="node.type === 'validation'"
          />
          <small>{{ node.type }} node</small>
        </span>
      </div>

      <hr/>

      <small class="text-muted ml-1">Description</small><br/>
      <p class="card-text">
        <span>{{ node.description }}</span>
      </p>

      <hr/>

      <small class="text-muted ml-1">Forms</small><br/>
      <div v-for="form,i in node.forms"
        :key="i"
        class="border-left border-info pl-2 mb-3"
      >
        <app-form-view :form="form"/>
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
};
</script>
