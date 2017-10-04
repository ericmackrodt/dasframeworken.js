// Not used anyore, at least for now

import { IKeyValue, IHtmlElement, IHtmlAttribute, IBaseHtml, IDirectiveCode } from './_types';
const MagicString = require('magic-string').default;

export class CodeTransform {
    private _magicString: any;
    constructor(_html: string, _fileName: string) {
        this._magicString = new MagicString(_html, { filename: _fileName });
    }

    public writeLine(node: IBaseHtml, content: string, prepend?: string, append?: string) {
        this._magicString.overwrite(node.startIndex, node.endIndex, content, true);
        if (prepend) {
            this._magicString.appendLeft(node.startIndex, prepend);
        }

        if (append) {
            this._magicString.prependLeft(node.endIndex, append);
        }
    }

    public removeHtml(element: IBaseHtml) {
        this._magicString.remove(element.startIndex, element.endIndex);
    }

    public removeCharacter(index: number) {
        this._magicString.remove(index, index + 1);
    }

    public clearAttributes(attributes: IKeyValue<IHtmlAttribute>) {
        Object.keys(attributes).forEach((key) => {
            const attr = attributes[key];
            this._magicString.remove(attr.startIndex, attr.endIndex);
        });
    }

    public writeDirectiveLine(directive: IHtmlAttribute, node: IHtmlElement, content: IDirectiveCode) {
        this._magicString.overwrite(directive.startIndex, directive.endIndex, content.content);
        this._magicString.move(directive.startIndex, directive.endIndex, node.closingTag.endIndex);

        this._magicString.prependLeft(node.startIndex, content.contextStart);
        this._magicString.appendLeft(node.closingTag.endIndex, content.contextEnd);
    }

    public prepend(value: string) {
        this._magicString.prepend(value);
        return this;
    }

    public append(value: string) {
        this._magicString.append(value);
        return this;
    }

    public generate() {
        return this._magicString.toString();
    }
}