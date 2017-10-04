import { IComponentMetadata } from './types/interfaces';
// import { Pubsub } from './events/pubsub';
import { Module } from './module';
import { Container } from './di.container';
import { Type, IComponentInstance, IController, IEventListener } from './types/interfaces';
import { Factory } from './templates/factory';
import { Pubsub } from './events/pubsub';

export const Component = function({ view, controller }: IComponentMetadata): Type<IComponentInstance> {
    // const bindings = new Pubsub();
    // const eventListeners = [];
    // const children = [];
    // const directives = [];
    const _bindings = new Pubsub();
    const _eventListeners: IEventListener[] = [];

    return class ComponentInstance implements IComponentInstance {
        // private _container: Container;
        // private _module: Module;
        private _controller: IController;

        constructor(
            private _container?: Container,
            private _module?: Module
        ) {
            if (!_container) {
                this._container = new Container();
            }
        }

        public registerEvent(element: Element, event: string, callback: (arg: any) => void) {
            let listener = _eventListeners.find((e: IEventListener) => e.element === element && e.event === event);
            if (!listener) {
                listener = {
                    element: element,
                    event: event,
                    callback: callback
                };
    
                element.addEventListener(event, callback, true);
                _eventListeners.push(listener);
            }
        }

        public registerBinding(property: string, binding: (property: string) => void) {
            _bindings.subscribe(property, binding);
            binding(property);
        }

        // TODO: Order initializatio and creat hooks
        public initialize(element?: Element) {
            this._controller = this._container.resolve(controller, true);
            const factory = new Factory({}, [], this, this._container);
            const rendered = view(factory, this._controller);
            if (element) element.appendChild(rendered);

            if (typeof this._controller.onPropertyChanged !== 'function') {
                this._controller.onPropertyChanged = (name: string) => _bindings.emit(name, name);
            }

            return rendered;
        }

        public teardown() {

        }
    }
}

export default Component;