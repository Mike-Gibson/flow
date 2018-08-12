import { Item } from './item';

export class Connector {
    get source() { return this.sourceItem; }
    get target() { return this.targetItem; }

    constructor(private sourceItem: Item, private targetItem: Item) {
    }
}
