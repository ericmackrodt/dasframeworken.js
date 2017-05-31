import transpiler from './../src/transpiler';
import * as chai from 'chai';

chai.should();

describe('Transpiler', () => {
    const componentBase = (...lines: string[]) => [
        `"use strict";`,
        `import { templateFactory } from '@dasframeworken/base';`,
        `import { TestComponent } from './test.component.ts';`,
        ``,
        `export default {`,
        `    selector: 'test',`,
        `    controller: TestComponent,`,
        `    render: (controller, container) => {`,
        `const root = templateFactory.createRoot('test', TestComponent);`,
        ...lines,
        `        return root;`,
        `    }`,
        `};`
    ].join('\n');

    const htmlBase = (...lines: string[]) => [
        `<component `,
        `    selector="test"`,
        `    controller="{ 'TestComponent': './test.component.ts' }" />`,
        ...lines
    ].join('\n');

    it('should throw if no component root');

    it('should transpile base component', () => {
        const html = htmlBase();

        const result = transpiler(html, 'file.html');

        result.source.should.be.equal(componentBase());
    });

    it('should transpile component with single element', () => { 
        const html = htmlBase('<div></div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(`const div0 = templateFactory.createElement(container, 'div', root);`);

        result.source.should.be.equal(expected);
    });

    it('should transpile component with multiple elements', () => { 
        const html = htmlBase('<div></div><br/>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `const br0 = templateFactory.createElement(container, 'br', root);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile component with child element', () => { 
        const html = htmlBase('<div><img/></div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `const img0 = templateFactory.createElement(container, 'img', div0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile multiple elements of same type', () => { 
        const html = htmlBase('<div/><div></div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `const div1 = templateFactory.createElement(container, 'div', root);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile simple attribute', () => { 
        const html = htmlBase('<div class="test"></div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setAttribute('class', 'test', div0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile component with multiple attributes', () => { 
        const html = htmlBase('<div class="test" style="background: black"></div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setAttribute('class', 'test', div0);`,
            `templateFactory.setAttribute('style', 'background: black', div0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile child element with attribute', () => { 
        const html = htmlBase('<div><span class="test"></span></div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `const span0 = templateFactory.createElement(container, 'span', div0);`,
            `templateFactory.setAttribute('class', 'test', span0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile attributes on both parent and child', () => { 
        const html = htmlBase(
            `<div style="background: black">`,
            `   <span class="test"></span>`,
            `</div>`
        );

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setAttribute('style', 'background: black', div0);`,
            `const span0 = templateFactory.createElement(container, 'span', div0);`,
            `templateFactory.setAttribute('class', 'test', span0);`,
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile multiple elements with attributes', () => { 
        const html = htmlBase(
            `<div style="background: black"></div>`,
            `<span class="test"></span>`
        );

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setAttribute('style', 'background: black', div0);`,
            `const span0 = templateFactory.createElement(container, 'span', root);`,
            `templateFactory.setAttribute('class', 'test', span0);`,
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile event attribute', () => { 
        const html = htmlBase('<button trigger:click="onClick()"></button>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const button0 = templateFactory.createElement(container, 'button', root);`,
            `templateFactory.setEvent(container, 'click', ($event) => controller.onClick(), button0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile simple text', () => { 
        const html = htmlBase('Simple Text');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `templateFactory.setText('Simple Text', root);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile bound text', () => { 
        const html = htmlBase('@{bound}');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `templateFactory.boundText(container, 'bound', root, () => controller.bound);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile simple text with bound text on the left', () => { 
        const html = htmlBase('@{bound} text');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `templateFactory.boundText(container, 'bound', root, () => controller.bound);`,
            `templateFactory.setText(' text', root);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile simple text with bound text on the right', () => { 
        const html = htmlBase('text @{bound}');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `templateFactory.setText('text ', root);`,
            `templateFactory.boundText(container, 'bound', root, () => controller.bound);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile simple text between bound texts', () => { 
        const html = htmlBase('@{bound1} text @{bound2}');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `templateFactory.boundText(container, 'bound1', root, () => controller.bound1);`,
            `templateFactory.setText(' text ', root);`,
            `templateFactory.boundText(container, 'bound2', root, () => controller.bound2);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile bound text between simple texts', () => { 
        const html = htmlBase('text 1 @{bound} text 2');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `templateFactory.setText('text 1 ', root);`,
            `templateFactory.boundText(container, 'bound', root, () => controller.bound);`,
            `templateFactory.setText(' text 2', root);`,
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile element with simple text child', () => { 
        const html = htmlBase('<div>Simple Text</div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setText('Simple Text', div0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile element with bound text child', () => { 
        const html = htmlBase('<div>@{bound}</div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.boundText(container, 'bound', div0, () => controller.bound);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile element with simple text child with bound text on the left', () => { 
        const html = htmlBase('<div>@{bound} text</div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.boundText(container, 'bound', div0, () => controller.bound);`,
            `templateFactory.setText(' text', div0);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile element with simple text child with bound text on the right', () => { 
        const html = htmlBase('<div>text @{bound}</div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setText('text ', div0);`,
            `templateFactory.boundText(container, 'bound', div0, () => controller.bound);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile element with simple text child between bound texts', () => { 
        const html = htmlBase('<div>@{bound1} text @{bound2}</div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.boundText(container, 'bound1', div0, () => controller.bound1);`,
            `templateFactory.setText(' text ', div0);`,
            `templateFactory.boundText(container, 'bound2', div0, () => controller.bound2);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile element with bound text child between simple texts', () => { 
        const html = htmlBase('<div>text 1 @{bound} text 2</div>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const div0 = templateFactory.createElement(container, 'div', root);`,
            `templateFactory.setText('text 1 ', div0);`,
            `templateFactory.boundText(container, 'bound', div0, () => controller.bound);`,
            `templateFactory.setText(' text 2', div0);`,
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @if directive', () => { 
        const html = htmlBase('<span @if="test === true"></span>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const span0IfDirectiveContext = () => {`,
            `const span0 = templateFactory.createElement(container, 'span', root);`,
            `return span0;`,
            `};`,
            `templateFactory.ifDirective(container, 'test === true', root, span0IfDirectiveContext);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @for directive', () => { 
        const html = htmlBase('<span @for="variable in list"></span>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const span0ForDirectiveContext = (variable) => {`,
            `const span0 = templateFactory.createElement(container, 'span', root);`,
            `return span0;`,
            `};`,
            `templateFactory.forDirective(container, 'list', () => controller.list, root, span0ForDirectiveContext);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @for directive with context variable', () => { 
        const html = htmlBase('<span @for="variable in list">@{variable}</span>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const span0ForDirectiveContext = (variable) => {`,
            `const span0 = templateFactory.createElement(container, 'span', root);`,
            `templateFactory.boundText(container, 'variable', span0, () => variable);`,
            `return span0;`,
            `};`,
            `templateFactory.forDirective(container, 'list', () => controller.list, root, span0ForDirectiveContext);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @for directive with controller context variable', () => { 
        const html = htmlBase('<span @for="variable in list">@{other}</span>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const span0ForDirectiveContext = (variable) => {`,
            `const span0 = templateFactory.createElement(container, 'span', root);`,
            `templateFactory.boundText(container, 'other', span0, () => controller.other);`,
            `return span0;`,
            `};`,
            `templateFactory.forDirective(container, 'list', () => controller.list, root, span0ForDirectiveContext);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @for directive with both controller and context variable', () => { 
        const html = htmlBase('<span @for="variable in list">@{other} @{variable}</span>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const span0ForDirectiveContext = (variable) => {`,
            `const span0 = templateFactory.createElement(container, 'span', root);`,
            `templateFactory.boundText(container, 'other', span0, () => controller.other);`,
            `templateFactory.boundText(container, 'variable', span0, () => variable);`,
            `return span0;`,
            `};`,
            `templateFactory.forDirective(container, 'list', () => controller.list, root, span0ForDirectiveContext);`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @if and @for directives together');//, () => { 
    //     const html = htmlBase('<span @for="variable in list" @if="property === true"></span>');

    //     let result = transpiler(html, 'file.html');

    //     const expected = componentBase(
    //         `const span0ForDirectiveContext = (context, variable) => {`,
    //         `const span0IfDirectiveContext = (context) => {`,
    //         `const span0 = templateFactory.createElement(container, 'span', root);`,
    //         `return span0;`,
    //         `};`,
    //         `return templateFactory.setDirective(container, controller, '@if', 'test === true', root, span0DirectiveContext);`,
    //         `};`,
    //         `templateFactory.setDirective(container, controller, '@for', 'variable', root, span0ForDirectiveContext);`
    //     );

    //     result.source.should.be.equal(expected);
    // });

    it('should transpile bind attribute', () => {
        const html = htmlBase('<input bind:value="field"></input>');

        let result = transpiler(html, 'file.html');

        const expected = componentBase(
            `const input0 = templateFactory.createElement(container, 'input', root);`,
            `templateFactory.setBinding(container, 'field', () => {`,
            `    if (input0.value !== controller.field) {`,
            `        input0.value = controller.field;`,
            `    }`,
            `});`
        );

        result.source.should.be.equal(expected);
    });

    it('should transpile @for with other context variables');

    it('should apply custom variable name to element');
});