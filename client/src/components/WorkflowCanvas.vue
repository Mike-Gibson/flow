<template>
  <div :class="{ 'pan-mode': tool == 'pan' }">
    <svg preserveAspectRatio:="xMidYMid meet" ref="svg">
      <g :style="rootTransform">

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

<div>{{ item.inputPorts }} </div>
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
    <div class="controls">
      <button type="button" @click="resetZoomAndPan">Reset</button>
      <input class="zoom-slider" type="range" min="0.5" max="2" :value="zoom" @input="changeZoom($event.target.value)" step="0.05">
      <label>
        <input type="checkbox" :checked="tool == 'pan'" @change="toggleTool('pan')" />
        Pan
      </label>
    </div>
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
  zoom: number = 1;
  pan: { x: number; y: number; } = { x: 0, y: 0 };

  tool: string | null = 'pan';

  get rootTransform() {
    const scale = this.zoom;
    const xTranslation = this.pan.x;
    const yTranslation = this.pan.y;
    return `transform: matrix(${scale}, 0, 0, ${scale}, ${xTranslation}, ${yTranslation})`;
  }

  constructor() {
    super();

    const workflow = new Workflow();
    workflow.addItem(new Item('Item 1', { top: 10, left: 10 }));
    workflow.addItem(new Item('Item 2', { top: 200, left: 100 }));

    this.workflow = new WorkflowViewModel(workflow);
  }

  mounted() {
    // TODO: use refs.svg
    makeDraggable(
      this.$refs.svg as SVGSVGElement,
      () => this.tool,
      (newX: number, newY: number) => {
        this.pan = { x: newX, y: newY };
      },
      (element: Element, newX: number, newY: number) => {
        const item = this.workflow.items[0]; // TODO: Identify
        item.x = newX;
        item.y = newY;
      });
  }

  resetZoomAndPan() {
    this.zoom = 1;
    this.pan = { x: 0, y: 0 };
  }

  changeZoom(newValue: number) {
    this.zoom = newValue;
  }

  toggleTool(tool: string) {
    if (this.tool === tool) {
      this.tool = null;
    } else {
      this.tool = tool;
    }
  }
}

function makeDraggable(
  svgElement: SVGSVGElement,
  getTool: () => string | null,
  updatePan: (newX: number, newY: number) => void,
  updateItem: (element: Element, deltaX: number, deltaY: number) => void) {
  svgElement.addEventListener('mousedown', startDrag);
  svgElement.addEventListener('mousemove', drag);
  svgElement.addEventListener('mouseup', endDrag);
  // svgElement.addEventListener('mouseleave', endDrag);

  const viewport: SVGSVGElement = svgElement.childNodes[0] as SVGSVGElement; // TODO: WRONG TYPE?;

  let state: 'dragging' | null = null;
  let selectedElement: Element | null = null;
  let offset: { x: number; y: number };
  let origin: { x: number; y: number };

  let firstEventCTM: SVGMatrix;

  function startDrag(evt: MouseEvent) {
    const tool = getTool();

    if (tool === 'pan') {
      firstEventCTM = viewport.getCTM()!;
      origin = getEventPoint(evt).matrixTransform(firstEventCTM.inverse());
    } else {
      offset = getMousePosition(evt);
      selectedElement = evt.target as Element; // TODO: Check can be dragged, bomb out if not
      offset.x -= parseFloat(selectedElement.getAttributeNS('', 'x'));
      offset.y -= parseFloat(selectedElement.getAttributeNS('', 'y'));
    }

    state = 'dragging';
  }
  function drag(evt: MouseEvent) {
    if (state === 'dragging') {
      evt.preventDefault();

      const tool = getTool();

      if (tool === 'pan') {
        const point = getEventPoint(evt).matrixTransform(firstEventCTM.inverse());
        const viewportCTM = firstEventCTM.translate(point.x - origin.x, point.y - origin.y);

        updatePan(viewportCTM.e, viewportCTM.f);
      } else {
        // Moving?
        const coord = getMousePosition(evt);
        const deltaX = coord.x - offset.x;
        const deltaY = coord.y - offset.y;

        updateItem(null as any, deltaX, deltaY);
      }
    }
  }
  function endDrag() {
    state = null;
    selectedElement = null;
  }

  function getMousePosition(evt: MouseEvent) {
    const ctm = viewport.getScreenCTM();

    if (!ctm) {
      throw new Error('Could not get ctm');
    }

    return {
      x: (evt.clientX - ctm.e) / ctm.a,
      y: (evt.clientY - ctm.f) / ctm.d,
    };
  }

  function getEventPoint(evt: MouseEvent) {
    const point = svgElement.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pan-mode {
  cursor: all-scroll;
}

svg {
  width: 100%;
  height: 100%;
}
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

.controls {
  bottom: 0;
  margin-left: 10px;
  margin-bottom: 10px;
  position: absolute;
  height: 20px;
  border: 1px solid green;
}

.controls .zoom-slider {
  width: 140px;
}
</style>
