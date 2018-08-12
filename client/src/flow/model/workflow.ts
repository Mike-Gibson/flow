import { Connector } from './connector';
import { Item } from './item';

export class Workflow {
    // TODO: Make immutable from outside class
    items: Item[];

    private connections: Connector[];

    constructor() {
        this.items = [];
        this.connections = [];
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    deleteItem(item: Item) {
        this.items = this.items.filter((i) => i !== item);
        this.connections = this.connections.filter((c) => c.source !== item && c.target !== item);
    }

    connectItems(source: Item, target: Item) {
        this.connections.push(new Connector(source, target));
    }

    deleteConnection(connector: Connector) {
        this.connections = this.connections.filter((c) => c !== connector);
    }
}
