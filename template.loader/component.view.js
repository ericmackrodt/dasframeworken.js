"use strict";
        import * as templateFactory from 'base/templates/template.factory';
        import { TitleComponent } from './title.component.js';

        export default {
            selector: 'title-comp',
            controller: TitleComponent,
            render: (controller, container) => {
    const root = templateFactory.createRoot('title-comp', TitleComponent, root);

        
        
    const h10 = templateFactory.createElement(container, 'h1', root);
    templateFactory.setText('This is a title component', h10);

    const div0 = templateFactory.createElement(container, 'div', root);
    templateFactory.boundText(container, 'potato', div0, () => controller.potato);

    const button0 = templateFactory.createElement(container, 'button', root);
     templateFactory.setEvent(container, 'click', ($event) => controller.clicked(), button0);
    templateFactory.setText('POtato button', button0);
return root;
    }

        };