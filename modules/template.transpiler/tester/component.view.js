"use strict";
import { templateFactory, Component } from '@dasframeworken/base';
import Controller from './home.component.ts';

export default Component({
    controller: Controller,
    view: (controller, container) => {
        const root = element.root('component-html', 
            templateFactory.element('blockquote', null, 
                templateFactory.element('p', null, 
                    templateFactory.boundText('prop', () => controller.prop), 
                    templateFactory.text(' is cool ey oh')
                ), 
                templateFactory.element('small', null, 
                    templateFactory.text('wooohooo')
                )
            ), 
            templateFactory.element('div', { 'class': 'input-control text' }, 
                templateFactory.element('input', { 'type': 'text', 'bind:value': 'prop', 'trigger:input': 'inputUpdated($event)' })
            ), 
            templateFactory.element('button', { 'class': 'button success block-shadow-success text-shadow', 'trigger:click': 'clicked()' }, 
                templateFactory.text('click here dude!')
            ), 
            templateFactory.text('This is just a text '), 
            templateFactory.element('br', null), 
            templateFactory.element('button', { 'class': 'button warning block-shadow-warning text-shadow', 'trigger:click': 'showHide()' }, 
                templateFactory.text('Show/hide')
            ), 
            templateFactory.element('button', { 'class': 'button danger block-shadow-warning text-shadow', 'trigger:click': 'addItem()' }, 
                templateFactory.text('Add Item')
            ), 
            templateFactory.element('ul', { 'class': 'numeric-list square-marker' }, 
                templateFactory.element('li', { '@for': 'item in list' }, 
                    templateFactory.boundText('item', () => controller.item), 
                )
            ), 
            templateFactory.element('div', { '@if': 'iffable === true', 'class': 'tile-wide bg-blue fg-white', 'data-role': 'tile' }, 
                templateFactory.element('div', { 'class': 'tile-content iconic' }, 
                    templateFactory.element('span', { 'class': 'icon mif-cloud' }), 
                    templateFactory.element('span', { 'class': 'tile-label' }, 
                        templateFactory.text('This is iffable')
                    )
                )
            )
        );
        return root;
    }
});