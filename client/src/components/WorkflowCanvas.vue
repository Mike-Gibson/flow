<template>
  <div>
    <svg width="100%" height="400px" preserveAspectRatio="xMidYMid meet">
      <!-- <g transform="matrix(0.649493 0 0 0.649493 50.806 -120.25)"> -->
      <g>

        <g v-for="item in workflow.items" :key="item.id">
          <rect
            class="item"
            rx="10"
            ry="10"
            :x="item.x"
            :y="item.y"
            width="150"
            height="60"
            :id="item.id">
              <title>WOAH</title>
          </rect>

          <g class="port"
            v-for="port in item.inputPorts" :key="port.id"
            :transform="port.transform">
            <circle r="5" cx="4"></circle>
          </g>
          <g class="port"
            v-for="port in item.outputPorts" :key="port.id"
            :transform="port.transform">
            <circle r="5" cx="4"></circle>
          </g>

          <text class="static-text" :x="item.x + 10" :y="item.y + 30">
            Train Model
          </text>

        </g>
      </g>
    </svg>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WorkflowViewModel } from '../flow/view/workflowViewModel';
import { Item } from '../flow/model/item';
import { Workflow } from '../flow/model/workflow';

@Component
export default class WorkflowCanvas extends Vue {
  workflow: WorkflowViewModel;

  constructor() {
    super();

    const workflow = new Workflow();
    workflow.addItem(new Item('Item 1', { top: 10, left: 10 }));
    workflow.addItem(new Item('Item 2', { top: 200, left: 100 }));

    this.workflow = new WorkflowViewModel(workflow);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg .item {
  stroke: #b3b3b3;
  stroke-width: 1px;
  fill: #fff;
}

svg .item:hover {
  stroke: gray;
  stroke-width: 2px;
  border-color: gray;
  border-width: 2px;
  margin: -2px;
}

svg .item.selected {
  stroke: #2086bf;
  stroke-width: 2px;
  border-width: 2px;
  margin: -2px;
  border-color: #2086bf;
}

svg .port {
  stroke: #b3b3b3;
  fill: #fff;
}

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
