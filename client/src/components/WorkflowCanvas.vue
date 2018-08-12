<template>
  <div>
    <svg ref="canvas">
    </svg>
    <hr />
    <button @click="click">GO</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WorkflowView } from '../flow/view/workflowView';
import { Item } from '../flow/model/item';
import { Workflow } from '../flow/model/workflow';

@Component
export default class WorkflowCanvas extends Vue {
  workflow: Workflow | null = null;
  workflowView: WorkflowView = null as any;

  mounted() {
    this.workflow = new Workflow();
    this.workflow.addItem(new Item('Item 1', { top: 10, left: 10 }));
    this.workflow.addItem(new Item('Item 2', { top: 60, left: 10 }));

    this.workflowView = new WorkflowView(this.workflow, this.$refs.canvas as Element);
    this.workflowView.render();
  }

  click() {
    this.workflowView.render();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
