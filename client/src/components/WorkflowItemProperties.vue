<template>
  <div class="item-properties">
    Properties...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class WorkflowItemProperties extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-properties {
  float: right;
  height: 100%;
  border: 1px solid #ff0000;
}
</style>
