export interface ViewInfo {
    top: number;
    left: number;
}

export class Item {
    constructor(public text: string, public viewInfo: ViewInfo) {
    }
}
