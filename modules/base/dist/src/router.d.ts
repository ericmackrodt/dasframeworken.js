export declare class Router {
    private _routes;
    private _currentRoute;
    private _onChange;
    onRouteChanging: (oldRoute: Frameworken.IRoute, newRoute: Frameworken.IRoute) => void;
    onRouteChanged: (currentRoute: Frameworken.IRoute) => void;
    constructor(routes: Frameworken.IRoute[]);
    _getHash(url: string): string;
    destroy(): void;
}
