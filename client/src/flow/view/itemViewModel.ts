import { Item, Port } from '../model/item';

export interface PortViewModel {
  description: string;
  transform: string;
}

export class ItemViewModel {
  x: number;
  y: number;
  text: string;
  inputPorts: PortViewModel[];
  outputPorts: PortViewModel[];

  constructor(private item: Item) {
    this.x = item.viewInfo.left;
    this.y = item.viewInfo.top;
    this.text = item.text;

    const rectWidth = 150;
    const rectHeight = 60;
    const portCircleRadius = 5;
    const createPort = (isInput: boolean) => (p: Port, index: number, allPorts: Port[]) => {
      const x = item.viewInfo.left + (rectWidth / (allPorts.length + 1)) * (index + 1) - (portCircleRadius / 2);
      const y = item.viewInfo.top + (isInput ? 0 : rectHeight);
      return {
        description: p.description,
        transform: `translate(${x}, ${y})`,
      };
    };

    this.inputPorts = item.inputPorts.map(createPort(true));
    this.outputPorts = item.outputPorts.map(createPort(false));
  }
}
