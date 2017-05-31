import HtmlParser from './../src/html.parser';
import * as chai from 'chai';
import * as sinon from "Sinon";
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);

const expect = chai.expect;

describe('HtmlParser', () => {
    const testEvent = (event: string, list: { html: string, assert: (calledWith: Chai.Assertion) => void }[]) => {
        list.forEach((test) => {
            it(`should call ${event} with [${test.html}]`, () => {
                const sut = new HtmlParser(test.html) as { [key: string]: any };
                sut[event] = sinon.spy();

                sut.execute();
                
                test.assert(expect(sut[event]));
            });
        });
    };

    testEvent('onOpenTag', [
        { html: '<div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 4, 4) },
        { html: '<div/>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 4, undefined) },
        { html: '<div></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 4, 4) },
        { html: '< div></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 5, 5) },
        { html: '<div ></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 5, 5) },
        { html: '<  div></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 6, 6) },
        { html: '<div  ></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 6, 6) },
        { html: '<div attribute="attr"></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 5, 21) },
        { html: '<div /></div>', assert: (expect) => expect.to.have.been.calledWith('div', 0, 5, undefined) },

        { html: '<div><br/></div>', assert: (expect) => { 
            expect.to.have.been.calledWith('div', 0, 4, 4); 
            expect.to.have.been.calledWith('br', 5, 8, undefined); 
        } },
        { html: '<div><span></span></div>', assert: (expect) => { 
            expect.to.have.been.calledWith('div', 0, 4, 4); 
            expect.to.have.been.calledWith('span', 5, 10, 10);
        } }
    ]);

    testEvent('onAttribute', [
        { html: '<p attrib="1">', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 3, 13) },
        { html: '<p  attrib="1">', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 4, 14) },
        { html: '<p attrib="1" >', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 3, 14) },
        { html: '<p attrib="1"  >', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 3, 15) },
        { html: '<p   attrib="1"  >', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 5, 17) },
        { html: '<p attrib="1" another="test">', assert: (expect) => { 
            expect.to.have.been.calledWith('attrib', '1', 3, 14);
            expect.to.have.been.calledWith('another', 'test', 14, 28);
        } },
        { html: '<p attrib="1"  another="test">', assert: (expect) => { 
            expect.to.have.been.calledWith('attrib', '1', 3, 15);
            expect.to.have.been.calledWith('another', 'test', 15, 29);
        } },
        { html: '<p another="test" attrib="1">', assert: (expect) => { 
            expect.to.have.been.calledWith('another', 'test', 3, 18);
            expect.to.have.been.calledWith('attrib', '1', 18, 28);
        } },
        { html: '<p  another="test"  attrib="1">', assert: (expect) => { 
            expect.to.have.been.calledWith('another', 'test', 4, 20);
            expect.to.have.been.calledWith('attrib', '1', 20, 30);
        } },
        { html: '<p attrib="1"/>', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 3, 13) },
        { html: '<p  attrib="1"/>', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 4, 14) },
        { html: '<p attrib="1" />', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 3, 14) },
        { html: '<p attrib="1"  />', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 3, 15) },
        { html: '<p   attrib="1"  />', assert: (expect) => expect.to.have.been.calledWith('attrib', '1', 5, 17) }
    ]);

    testEvent('onCloseTag', [
        { html: '<a/>', assert: (expect) => expect.to.have.been.calledWith('a', 2, 4) },
        { html: '<a />', assert: (expect) => expect.to.have.been.calledWith('a', 3, 5) },
        { html: '<a  />', assert: (expect) => expect.to.have.been.calledWith('a', 4, 6) },
        { html: '<a attrib="test"/>', assert: (expect) => expect.to.have.been.calledWith('a', 16, 18) },
        { html: '<a  attrib="test"/>', assert: (expect) => expect.to.have.been.calledWith('a', 17, 19) },
        { html: '<a   attrib="test"/>', assert: (expect) => expect.to.have.been.calledWith('a', 18, 20) },
        { html: '<a attrib="test" />', assert: (expect) => expect.to.have.been.calledWith('a', 17, 19) },
        { html: '<a  attrib="test"  />', assert: (expect) => expect.to.have.been.calledWith('a', 19, 21) },
        { html: '<a   attrib="test"  />', assert: (expect) => expect.to.have.been.calledWith('a', 20, 22) },

        { html: '<a></a>', assert: (expect) => expect.to.have.been.calledWith('a', 3, 7) },
        { html: '<a> </a>', assert: (expect) => expect.to.have.been.calledWith('a', 4, 8) },
        { html: '<a>  </a>', assert: (expect) => expect.to.have.been.calledWith('a', 5, 9) },
        
        { html: '<a attrib="test"></a>', assert: (expect) => expect.to.have.been.calledWith('a', 17, 21) },
        { html: '<a attrib="test"> </a>', assert: (expect) => expect.to.have.been.calledWith('a', 18, 22) },
        { html: '<a attrib="test">  </a>', assert: (expect) => expect.to.have.been.calledWith('a', 19, 23) },

        { html: '<a attrib="test"></ a>', assert: (expect) => expect.to.have.been.calledWith('a', 17, 22) },
        { html: '<a attrib="test"></  a>', assert: (expect) => expect.to.have.been.calledWith('a', 17, 23) },
        { html: '<a attrib="test"></a >', assert: (expect) => expect.to.have.been.calledWith('a', 17, 22) },
        { html: '<a attrib="test"></a  >', assert: (expect) => expect.to.have.been.calledWith('a', 17, 23) },
        { html: '<a attrib="test"></ a >', assert: (expect) => expect.to.have.been.calledWith('a', 17, 23) },
        { html: '<a attrib="test"></  a  >', assert: (expect) => expect.to.have.been.calledWith('a', 17, 25) },
        
        { html: '<a attrib="test">Test</a>', assert: (expect) => expect.to.have.been.calledWith('a', 21, 25) },
        { html: '<a attrib="test"> Test </a>', assert: (expect) => expect.to.have.been.calledWith('a', 23, 27) },
        
        { html: '<a attrib="test"><br/></a>', assert: (expect) => { 
            expect.to.have.been.calledWith('br', 20, 22);
            expect.to.have.been.calledWith('a', 22, 26);
        } },
        { html: '<a attrib="test"><div></div></a>', assert: (expect) => {
            expect.to.have.been.calledWith('div', 22, 28);
            expect.to.have.been.calledWith('a', 28, 32);
        } }
    ]);

    testEvent('onText', [
        { html: 'Text', assert: (expect) => expect.to.have.been.calledWith('Text', 0, 4) },
        { html: ' Text', assert: (expect) => expect.to.have.been.calledWith(' Text', 0, 5) },
        { html: '  Text', assert: (expect) => expect.to.have.been.calledWith('  Text', 0, 6) },
        { html: 'Text ', assert: (expect) => expect.to.have.been.calledWith('Text ', 0, 5) },
        { html: 'Text  ', assert: (expect) => expect.to.have.been.calledWith('Text  ', 0, 6) },
        { html: ' Text ', assert: (expect) => expect.to.have.been.calledWith(' Text ', 0, 6) },
        { html: '  Text  ', assert: (expect) => expect.to.have.been.calledWith('  Text  ', 0, 8) },

        { html: '<span>Text</span>', assert: (expect) => expect.to.have.been.calledWith('Text', 6, 10) },
        { html: '<span> Text</span>', assert: (expect) => expect.to.have.been.calledWith(' Text', 6, 11) },
        { html: '<span>  Text</span>', assert: (expect) => expect.to.have.been.calledWith('  Text', 6, 12) },
        { html: '<span>Text </span>', assert: (expect) => expect.to.have.been.calledWith('Text ', 6, 11) },
        { html: '<span>Text  </span>', assert: (expect) => expect.to.have.been.calledWith('Text  ', 6, 12) },
        { html: '<span> Text </span>', assert: (expect) => expect.to.have.been.calledWith(' Text ', 6, 12) },
        { html: '<span>  Text  </span>', assert: (expect) => expect.to.have.been.calledWith('  Text  ', 6, 14) },

        { html: '<span><br/>Text</span>', assert: (expect) => expect.to.have.been.calledWith('Text', 11, 15) },
        { html: '<span><br/> Text</span>', assert: (expect) => expect.to.have.been.calledWith(' Text', 11, 16) },
        { html: '<span><br/>  Text</span>', assert: (expect) => expect.to.have.been.calledWith('  Text', 11, 17) },
        { html: '<span><br/>Text </span>', assert: (expect) => expect.to.have.been.calledWith('Text ', 11, 16) },
        { html: '<span><br/>Text  </span>', assert: (expect) => expect.to.have.been.calledWith('Text  ', 11, 17) },
        { html: '<span><br/> Text </span>', assert: (expect) => expect.to.have.been.calledWith(' Text ', 11, 17) },
        { html: '<span><br/>  Text  </span>', assert: (expect) => expect.to.have.been.calledWith('  Text  ', 11, 19) },

        { html: '<span>Text<div></div></span>', assert: (expect) => expect.to.have.been.calledWith('Text', 6, 10) },
        { html: '<span> Text<div></div></span>', assert: (expect) => expect.to.have.been.calledWith(' Text', 6, 11) },
        { html: '<span>  Text<div></div></span>', assert: (expect) => expect.to.have.been.calledWith('  Text', 6, 12) },
        { html: '<span>Text <div></div></span>', assert: (expect) => expect.to.have.been.calledWith('Text ', 6, 11) },
        { html: '<span>Text  <div></div></span>', assert: (expect) => expect.to.have.been.calledWith('Text  ', 6, 12) },
        { html: '<span> Text <div></div></span>', assert: (expect) => expect.to.have.been.calledWith(' Text ', 6, 12) },
        { html: '<span>  Text  <div></div></span>', assert: (expect) => expect.to.have.been.calledWith('  Text  ', 6, 14) },

        { html: '<span>Text1<div>Text2</div></span>', assert: (expect) => {
            expect.to.have.been.calledWith('Text1', 6, 11);
            expect.to.have.been.calledWith('Text2', 16, 21);
        } },
        { html: '<span><div>Text1</div>Text2</span>', assert: (expect) => {
            expect.to.have.been.calledWith('Text1', 11, 16);
            expect.to.have.been.calledWith('Text2', 22, 27);
        } },
        { html: '<span>Text1<div>Text2</div>Text3</span>', assert: (expect) => {
            expect.to.have.been.calledWith('Text1', 6, 11);
            expect.to.have.been.calledWith('Text2', 16, 21);
            expect.to.have.been.calledWith('Text3', 27, 32);
        } },
    ]);

    // This test isn't perfect but gets the job done.
    it(`should parse html in order`, () => {
        const html = '<div>Test<span>Test2</span><br/>Test3<a href="url">Url</a></div>';
        const sut = new HtmlParser(html);
        const struct: string[] = [];

        sut.onOpenTag = (name) => struct.push(name);
        sut.onCloseTag = (name) => struct.push('/' + name);
        sut.onAttribute = (name, value) => struct.push(name + "=" + value);
        sut.onText = (name) => struct.push(name);

        sut.execute();
        
        expect(struct).to.be.deep.equal([
            'div',
            'Test',
            'span',
            'Test2',
            '/span',
            'br',
            '/br',
            'Test3',
            'a',
            'href=url',
            'Url',
            '/a',
            '/div'
        ]);
    });

    it('should throw error if closing tag that has not been opened');

    // Test calling order!
});