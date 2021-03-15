<template>
  <button @click="exportXml">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    tree: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: 'excel',
    },
  },

  methods: {
    exportXml() {
      var element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(this.tree),
      );
      element.setAttribute(
        'download',
        `${this.filename}.xml`,
      );

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>
