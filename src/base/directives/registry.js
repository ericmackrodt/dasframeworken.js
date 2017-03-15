import { IfDirective } from './if.directive';
import { RepeatDirective } from './repeat.directive';
import * as utils from './../utils';

export const directivesRegistry = (function directivesRegistry() {
    const PREFIX = '@';
    let registry = null;

    function getName(name) {
        return PREFIX + name;
    }

    class DirectiveRegistry {
        constructor() {
            registry = [
                IfDirective,
                RepeatDirective
            ];
        }

        find(name) {
            return registry.find(d => getName(d.metadata.selector) === name);
        }

        instantiateDirective(directive, controller, value, element) {
            const instance = utils.instantiateType(directive, [element, controller]);
            return instance.setup(value);
        }
    }

    return new DirectiveRegistry();
}) ();