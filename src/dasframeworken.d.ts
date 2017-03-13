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
        resolve?: <T>(route: IRoute) => Promise<T> | void;
    }

    interface IModuleOptions {
        onPreLoad?: <T>() => Promise<T> | void;
        types?: Object[];
        routes?: IRoute[];
        components: Object[];
        rootComponent: Object;
    }

    interface IModule {
        deploy: (element: HTMLElement) => void;
    }

    interface IFrameworken {
        module: (name: string, options: IModuleOptions) => IModule;
    }
}
