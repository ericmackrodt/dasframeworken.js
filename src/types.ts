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
        controller: any;
        render: Function;
        selector: string;
    }

    interface IRoute {
        path: string;
        root: IComponent;
        resolve?: <T>(route: IRoute) => Promise<T> | boolean | void;
    }

    interface IModuleOptions {
        preLoad?: <T>() => Promise<T> | boolean | void;
        types?: any[];
        routes?: IRoute[];
        components: Object[];
        rootComponent: IComponent;
    }

    interface IModule {
        getComponent: (selector: string) => IComponent;
        deploy: (element: HTMLElement) => void;
    }

    interface IFrameworken {
        module: (name: string, options: IModuleOptions) => IModule;
    }
}
