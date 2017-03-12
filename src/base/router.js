export class Router {
    constructor(routes) {
        this._routes = routes;
        this._onChange = () => {
            const url = location.hash.slice(1) || '/';
            const route = this._routes.find(r => r.path === url);
            if (route && typeof this.onRouteChanged === 'function') {
                this.onRouteChanged(route);
            }
        };
        window.addEventListener('hashchange', this._onChange);
        window.addEventListener('load', this._onChange);
    }

    

    destroy() {
        window.removeEventListener('hashchange', this._onChange);
        window.removeEventListener('load', this._onChange);
    }
}