<template>
  <div class="workflow-container">
    <WorkflowToolbox style="float: left; width: 200px; height: 100%;" />
    <WorkflowItemProperties style="float: right; width: 260px; height: 100%;" />
    <WorkflowCanvas style="overflow: hidden; position: relative; height: 100%;" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WorkflowCanvas from '@/components/WorkflowCanvas.vue'; // @ is an alias to /src
import WorkflowItemProperties from '@/components/WorkflowItemProperties.vue'; // @ is an alias to /src
import WorkflowToolbox from '@/components/WorkflowToolbox.vue'; // @ is an alias to /src

@Component({
  components: {
    WorkflowCanvas,
    WorkflowItemProperties,
    WorkflowToolbox,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.workflow-container {
  position: fixed;
  left: 10px;
  right: 10px;
  top: 80px;
  bottom: 10px;
  border: 1px solid blue;
  overflow: hidden;
}
</style>
