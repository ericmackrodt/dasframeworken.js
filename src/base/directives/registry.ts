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
export const instantiate = (directive: Type<IDirective>, parent: Element, controller: IController, pubsub: Pubsub, value: string, context: (context: any) => Element) => {
    const instance = utils.instantiateType(directive, ...[parent, controller, pubsub, context]);
    instance.setup(value);
    return instance;
};