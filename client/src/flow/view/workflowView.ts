import { Item } from '../model/item';
import { Workflow } from '../model/workflow';
import * as d3 from 'd3';
import 'd3-selection-multi';

export class WorkflowView {
    constructor(private workflow: Workflow, private canvas: Element) {
    }

    render() {
        const items = this.workflow.items;
        const itemViews = d3.select(this.canvas).selectAll('g.item').data(items);

        const updated = itemViews
          .enter()
          .append('g')
          // .merge(itemViews)
          .attrs({
            width: 20,
            height: 20,
            class: 'item',
            transform: (d) => `translate(${d.viewInfo.left}, ${d.viewInfo.top})`,
          });
            // .call(this.setupDrag());
        itemViews.exit().remove();

        updated
          .append('rect')
          .attrs({ width: 20, height: 20, class: 'r' });
    }
}
