import { Module } from './module';

const modules: { [key: string]: Frameworken.IModule } = {};

export const module = (name: string, options: Frameworken.IModuleOptions) => {
    let module = modules[name];
    if (!module) {
        module = new Module(name, options);
        modules[name] = module;
    }
    return module;
}