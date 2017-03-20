import { IController, IDirective, Type } from './../types/interfaces';
import { IfDirective } from './if.directive';
import { RepeatDirective } from './repeat.directive';
import * as utils from './../utils';
import { Pubsub } from "../events/pubsub";

const registry = [
    IfDirective,
    RepeatDirective
];
const PREFIX = '@';
const getName = (name: string) => PREFIX + name;

export const find = (name: string) => registry.find((d: Type<any>) => getName(d.metadata.selector) === name);
export const instantiate = (directive: Type<IDirective>, controller: IController, pubsub: Pubsub, value: string, element: Element) => {
    const instance = utils.instantiateType(directive, [element, controller, pubsub]);
    instance.setup(value);
    return instance;
};