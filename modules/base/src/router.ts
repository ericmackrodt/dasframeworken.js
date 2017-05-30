import * as utils from './utils';

export class Router {
    private _routes: Frameworken.IRoute[];
    private _currentRoute: Frameworken.IRoute;
    private _onChange: (eventArgs: HashChangeEvent) => void;

    public onRouteChanging: (oldRoute: Frameworken.IRoute, newRoute: Frameworken.IRoute) => void;
    public onRouteChanged: (currentRoute: Frameworken.IRoute) => void;

    constructor(routes: Frameworken.IRoute[]) {
        this._routes = routes;
        this._currentRoute = null;
        this._onChange = (eventArgs) => {
            const oldUrl = eventArgs.oldURL;
            const newUrl = eventArgs.newURL;
            const url = this._getHash(newUrl) || location.hash.slice(1) || '/';
            const route = this._routes.find((r: Frameworken.IRoute) => r.path === url);
            if (!route) return;

            const resolve = route.resolve && route.resolve(route);

            utils.returnPromise(resolve)
                .then(() => {
                    if (typeof this.onRouteChanging === 'function') {
                        this.onRouteChanging(this._currentRoute, route);
                    }
                    this._currentRoute = route;
                    if (typeof this.onRouteChanged === 'function') {
                        this.onRouteChanged(this._currentRoute);
                    }
                })
                .catch((ex: any) => {
                    debugger;
                    console.error(ex);
                    history.replaceState({}, route.path, '#' + this._getHash(oldUrl));
                });
        };
        window.addEventListener('hashchange', this._onChange);
        window.addEventListener('load', this._onChange);
    }

    _getHash(url: string) {
        if (!url) return url;
        const indexHash = url.indexOf('#') + 1;
        return url.substring(indexHash, url.length);
    }

    destroy() {
        window.removeEventListener('hashchange', this._onChange);
        window.removeEventListener('load', this._onChange);
    }
}