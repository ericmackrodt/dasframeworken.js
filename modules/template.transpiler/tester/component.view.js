"use strict";
import { templateFactory, Component } from '@dasframeworken/base';
import Controller from './home.component.ts';

export default Component({
    controller: Controller,
    view: (factory, controller) => {
        let input0;
    let button0;
    let button1;
    let button2;
        const root = factory.root('component-html', factory.element('blockquote', null, factory.element('p', null, 
                    factory.boundText('prop', () => controller.prop), 
                    factory.text(' is cool ey oh')
                ), factory.element('small', null, 
                    factory.text('wooohooo')
                )
            ), factory.element('div', { 'class': 'input-control text' }, input0 = factory.element('input', { 'type': 'text' })
            ), button0 = factory.element('button', { 'class': 'button success block-shadow-success text-shadow' }, 
                factory.text('click here dude!')
            ), 
            factory.text('This is just a text '), factory.element('br', null), button1 = factory.element('button', { 'class': 'button warning block-shadow-warning text-shadow' }, 
                factory.text('Show/hide')
            ), button2 = factory.element('button', { 'class': 'button danger block-shadow-warning text-shadow' }, 
                factory.text('Add Item')
            ), factory.element('ul', { 'class': 'numeric-list square-marker' }, factory.element('li', { '@for': 'item in list' }, 
                    factory.boundText('item', () => controller.item), 
                )
            ), factory.element('div', { '@if': 'iffable === true', 'class': 'tile-wide bg-blue fg-white', 'data-role': 'tile' }, factory.element('div', { 'class': 'tile-content iconic' }, factory.element('span', { 'class': 'icon mif-cloud' }), factory.element('span', { 'class': 'tile-label' }, 
                        factory.text('This is iffable')
                    )
                )
            )
        );
        factory.bind('property', () => {
                if (input0.prop !== controller.value) {
                    input0.prop = controller.value;
                }
            });
        factory.setEvent(input0, 'input', ($event) => controller.inputUpdated($event));
    factory.setEvent(button0, 'click', ($event) => controller.clicked());
    factory.setEvent(button1, 'click', ($event) => controller.showHide());
    factory.setEvent(button2, 'click', ($event) => controller.addItem());
        return root;
    }
});