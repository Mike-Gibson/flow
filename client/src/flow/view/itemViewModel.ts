import { Item, Port } from '../model/item';

export interface PortViewModel {
  description: string;
  transform: string;
}

export class ItemViewModel {
  x: number;
  y: number;
  text: string;

  get inputPorts() {
    return this.item.inputPorts.map(createPort(this.x, this.y, true));
  }

  get outputPorts() {
    return this.item.outputPorts.map(createPort(this.x, this.y, false));
  }

  constructor(private item: Item) {
    this.x = item.viewInfo.left;
    this.y = item.viewInfo.top;
    this.text = item.text;
  }
}

const rectWidth = 150;
const rectHeight = 60;
const portCircleRadius = 5;

const createPort = (itemX: number, itemY: number, isInput: boolean) => (p: Port, index: number, allPorts: Port[]) => {
  const x = itemX + (rectWidth / (allPorts.length + 1)) * (index + 1) - (portCircleRadius / 2);
  const y = itemY + (isInput ? 0 : rectHeight);
  return {
    description: p.description,
    transform: `translate(${x}, ${y})`,
  };
};
