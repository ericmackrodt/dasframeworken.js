import { IController } from './../types/interfaces';

export class RepeatDirective {
    static get metadata() {
        return {
            selector: 'repeat'
        };
    }

    constructor(element: Element, controller: IController) {

    }

    setup(value: string) {

    }

    teardown() {
        
    }
}