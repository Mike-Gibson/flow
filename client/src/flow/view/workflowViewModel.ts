import { ItemViewModel } from '../view/itemViewModel';
import { Item } from '../model/item';
import { Workflow } from '../model/workflow';
import * as d3 from 'd3';
import 'd3-selection-multi';

export class WorkflowViewModel {
    items: ItemViewModel[];

    constructor(private workflow: Workflow) {
      this.items = workflow.items.map((i) => new ItemViewModel(i));
    }
}
