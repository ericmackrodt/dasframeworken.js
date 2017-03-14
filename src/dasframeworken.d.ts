declare var frameworken: Frameworken.IFrameworken;

declare module 'dasframeworken' {
    export = frameworken;
}

declare module '*.html' {
    var value: Frameworken.IComponent;
    export = value;
}

declare namespace Frameworken {
    interface IComponent {
        controller: Function;
        render: Function;
        selector: string;
    }

    interface IRoute {
        path: string;
        root: Object;
        resolve?: <T>(route: IRoute) => Promise<T> | boolean | void;
    }

    interface IModuleOptions {
        preLoad?: <T>() => Promise<T> | boolean | void;
        types?: Object[];
        routes?: IRoute[];
        components: Object[];
        rootComponent: Object;
    }

    interface IModule {
        getComponent: (selector: string) => IComponent;
        deploy: (element: HTMLElement) => void;
    }

    interface IFrameworken {
        module: (name: string, options: IModuleOptions) => IModule;
    }
}
