<template>
  <div class="card border-info w-100">
    <div class="card-body px-3">

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

      <div v-if="node.forms">
        <hr/>

        <small class="text-muted ml-1">Forms</small><br/>
        <div v-for="form,formIter in node.forms"
          :key="formIter"
          class="border-left border-primary pl-2 mb-3"
        >
          <app-form-view :form="form"/>
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
};
</script>
