import { IBaseHtml } from './../../src/_types/index';
import { IHtmlElement, ElementTypeEnum, IKeyValue, IHtmlAttribute } from './../../src/_types';
import htmlObjectBuilder from './../../src/template.transpiler/html.object.builder';
import * as chai from 'chai';

chai.should();

describe('htmlObjectBuilder', () => {

    const testBuilder = (list: { html: string, expect: IHtmlElement[] }[]) => {
        list.forEach((test) => {
            it(`should build object for [${test.html}]`, () => {
                const result = htmlObjectBuilder(test.html);
                
                result.should.be.deep.equal(test.expect);
            });
        });
    };

    const attr = (val: string, start: number, end: number): IHtmlAttribute => ({
        value: val,
        startIndex: start,
        endIndex: end
    });

    const txt = (value: string, start: number, end: number): IHtmlElement => ({
        name: '#text',
        type: ElementTypeEnum.Text,
        startIndex: start,
        endIndex: end,
        value: value,
        closingTag: undefined,
        tail: undefined
    });

    const el = (name: string, start: number, end: number, closingTag?: IBaseHtml, tail?: number, attributes?: IKeyValue<IHtmlAttribute>, value?: string, ...children: IHtmlElement[]): IHtmlElement => ({ 
        name: name, 
        startIndex: start, 
        endIndex: end, 
        type: ElementTypeEnum.Element, 
        tail: tail, 
        attributes: attributes || {}, 
        value: value, 
        closingTag: closingTag, 
        children: children || []
    });

    testBuilder([
        { html: '<div>', expect: [
            el('div', 0, 4, undefined, 4)
        ] },
        { html: '<div></div>', expect: [
            el('div', 0, 4, { startIndex: 5, endIndex: 11 }, 4)
        ] },
        { html: '<div/>', expect: [
            el('div', 0, 4, { startIndex: 4, endIndex: 6 })
        ] },
        { html: '<div class="cls" />', expect: [
            el('div', 0, 5, { startIndex: 17, endIndex: 19 }, undefined, { 'class': attr('cls', 5, 17) })
        ] },
        { html: '<div class="cls" style="background: black" />', expect: [
            el('div', 0, 5, { startIndex: 43, endIndex: 45 }, undefined, { 'class': attr('cls', 5, 17), 'style': attr('background: black', 17, 43) })
        ] },
        { html: '<div class="cls">Text</div>', expect: [
            el('div', 0, 5, { startIndex: 21, endIndex: 27 }, 16, { 'class': attr('cls', 5, 16) }, undefined,
                txt('Text', 17, 21)
            )
        ] },
        { html: '<div class="cls"><span>Text</span></div>', expect: [
            el('div', 0, 5, { startIndex: 34, endIndex: 40 }, 16, { 'class': attr('cls', 5, 16) }, undefined,
                el('span', 17, 22, { startIndex: 27, endIndex: 34 }, 22, undefined, undefined,
                    txt('Text', 23, 27)
                )
            )
        ] },
        { html: '<component controller="ctrl" /><div class="cls"></div>', expect: [
            el('component', 0, 11, { startIndex: 29, endIndex: 31 }, undefined, { 'controller': attr('ctrl', 11, 29) }),
            el('div', 31, 36, { startIndex: 48, endIndex: 54 }, 47, { 'class': attr('cls', 36, 47) })
        ] },
        { html: '<component controller="ctrl" /><div class="cls">Text <br/> Text2</div>', expect: [
            el('component', 0, 11, { startIndex: 29, endIndex: 31 }, undefined, { 'controller': attr('ctrl', 11, 29) }),
            el('div', 31, 36, { startIndex: 64, endIndex: 70 }, 47, { 'class': attr('cls', 36, 47) }, undefined,
                txt('Text ', 48, 53),
                el('br', 53, 56, { startIndex: 56, endIndex: 58 }),
                txt(' Text2', 58, 64)
            )
        ] }
    ]);
});