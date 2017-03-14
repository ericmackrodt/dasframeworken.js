import * as utils from './utils';

export class Router {
    constructor(routes) {
        this._routes = routes;
        this._currentRoute = null;
        this._onChange = (eventArgs) => {
            const oldUrl = eventArgs.oldURL;
            const newUrl = eventArgs.newURL;
            const url = this._getHash(newUrl) || location.hash.slice(1) || '/';
            const route = this._routes.find(r => r.path === url);
            if (!route) return;

            const resolve = route.resolve && route.resolve();

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
                .catch(() => {
                    history.replaceState({}, route.path, '#' + this._getHash(oldUrl));
                });
        };
        window.addEventListener('hashchange', this._onChange);
        window.addEventListener('load', this._onChange);
    }

    _getHash(url) {
        if (!url) return url;
        const indexHash = url.indexOf('#') + 1;
        return url.substring(indexHash, url.length);
    }

    destroy() {
        window.removeEventListener('hashchange', this._onChange);
        window.removeEventListener('load', this._onChange);
    }
}