import { Module } from './module';
import { Container } from './di.container';
import { IModuleOptions } from './types/interfaces';
// import Component from "./component";
// import { IComponentInstance } from "types/interfaces";

const modules: { [key: string]: Module } = {};
const container = new Container();

export const module = (name: string, options: Partial<IModuleOptions>) => {
    let module = modules[name];
    if (!module) {
        module = new Module(container, name, options);
        modules[name] = module;
    }
    return module;
}

// export const deploy = (component: any, host: HTMLElement) => {
//     // const container = new Container();
//     // const instance = container.resolve(component);
    
// }