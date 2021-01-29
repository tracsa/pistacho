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

      <hr/>
      <small class="text-muted ml-1">Forms</small><br/>
      <div v-for="form,i in node.forms"
        :key="i"
        class="border-left border-info pl-2 mb-3"
      >
        <div v-for="input,j in form.inputs"
          :key="j"
        >
          <hr class="my-3" v-if="j !== 0">

          <label>Label</label>
          <input class="form-control"
            v-model="input.label"
          />

          <label>Type</label>
          <select class="custom-select"
            v-model="input.type"
          >
            <option
              v-for="option,k in inputTypes"
              :key="k"
              :value="option"
            >{{ option }}</option>
          </select>

          <label>Help text</label>
          <input class="form-control"
            v-model="input.helpText"
          />
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

      inputTypes: [
        'text',
        'date',
        'datetime',
        'select',
      ],
    };
  },
};
</script>
