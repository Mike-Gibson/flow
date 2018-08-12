export interface Port {
    description: string;
}

export interface ViewInfo {
    top: number;
    left: number;
}

export class Item {
    inputPorts: Port[];
    outputPorts: Port[];

    constructor(public text: string, public viewInfo: ViewInfo) {
        this.inputPorts = [{ description: 'input 1 '}];
        this.outputPorts = [{ description: 'output 1 '}, { description: 'output 2' }];
    }
}
