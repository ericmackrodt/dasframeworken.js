import { IHtmlElement, ElementTypeEnum } from './../_types';
import HtmlParser from './html.parser';

export default (html: string) => {
    const parser = new HtmlParser(html);
    const documentArray: IHtmlElement[] = [];
    let stack: IHtmlElement[] = [];

    const createElement = ({ name, type, startIndex, endIndex, closingTag, value, tail }: Partial<IHtmlElement>) => {
        const element: IHtmlElement = {
            name: name,
            startIndex: startIndex,
            endIndex: endIndex,
            type: type,
            value: value,
            closingTag: closingTag,
            tail: tail
        };

        let last = stack[stack.length - 1];

        if (last) {
            last.children.push(element);
        } else {
            documentArray.push(element);
        }

        return element;
    }

    parser.onOpenTag = (name, startIndex, endIndex, tail) => {
        const element = createElement({
            name: name,
            type: ElementTypeEnum.Element,
            startIndex: startIndex,
            endIndex: endIndex,
            tail: tail
        });

        element.children = [];
        element.attributes = {};

        stack.push(element);
    };

    parser.onCloseTag = (name, startIndex, endIndex) => {
        let lastIndex = -1;
        stack.forEach((item, index) => { 
            if (item.name === name) {
                lastIndex = index;
            }
        });
        const element = stack[lastIndex];
        element.closingTag = { startIndex, endIndex };
        stack.splice(lastIndex, 1);
    };

    parser.onAttribute = (name, value, startIndex, endIndex) => {
        const last = stack[stack.length - 1];
        last.attributes[name] = { value, startIndex, endIndex };
    };

    parser.onText = (value, startIndex, endIndex) => {
        createElement({
            name: '#text',
            type: ElementTypeEnum.Text,
            startIndex: startIndex,
            endIndex: endIndex,
            value: value
        });
    };

    parser.execute();
    return documentArray;
};