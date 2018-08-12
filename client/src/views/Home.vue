<template>
  <div class="home">
    <WorkflowCanvas />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WorkflowCanvas from '@/components/WorkflowCanvas.vue'; // @ is an alias to /src

@Component({
  components: {
    WorkflowCanvas,
  },
})
export default class Home extends Vue {}
</script>
