import { Module } from './module';
import { Container } from './di.container';

const modules: { [key: string]: Frameworken.IModule } = {};
const container = new Container();

export const module = (name: string, options: Frameworken.IModuleOptions) => {
    let module = modules[name];
    if (!module) {
        module = new Module(container, name, options);
        modules[name] = module;
    }
    return module;
}