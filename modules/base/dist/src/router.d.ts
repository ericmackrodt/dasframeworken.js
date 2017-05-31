import { IRoute } from './types/interfaces';
export declare class Router {
    private _routes;
    private _currentRoute;
    private _onChange;
    onRouteChanging: (oldRoute: IRoute, newRoute: IRoute) => void;
    onRouteChanged: (currentRoute: IRoute) => void;
    constructor(routes: IRoute[]);
    _getHash(url: string): string;
    destroy(): void;
}
