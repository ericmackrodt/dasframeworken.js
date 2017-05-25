export default class {
    private readonly HTML_REGEX = /<([^<]+)>|([^<>]+)/gi;
    private readonly TAG_REGEX = /\s*([\w-]+)\s*/;
    private readonly END_TAG_REGEX = /<\/\s*([\w-]+)\s*>/;

    public onOpenTag: (name: string, startIndex: number, endIndex: number, tailIndex?: number) => void;
    public onAttribute: (key: string, value: string, startIndex: number, endIndex: number) => void;
    public onCloseTag: (name: string, startIndex: number, endIndex: number) => void;
    public onText: (name: string, startIndex: number, endIndex: number) => void;

    constructor(private _html: string) {
        
    }

    execute() {
        let match;
        while ((match = this.HTML_REGEX.exec(this._html))) {

            if (match[0].startsWith('<') && !match[1].startsWith('/')) {
                const fullTag = match[1];
                const nameMatch = fullTag.match(this.TAG_REGEX);
                const ATTRIBUTE_REGEX = /([\w-:@]+[^=])=["]([^"]+)["]\s*|[']([^"]+)[']\s*/gi;
                let tailIndex: number;
                if (!fullTag.endsWith('/')) {
                    tailIndex = match[0].indexOf('>');
                }

                this.onOpenTag && this.onOpenTag(nameMatch[1], match.index, match.index + nameMatch[0].length + 1, match.index + tailIndex || undefined);

                let attribMatch;
                while((attribMatch = ATTRIBUTE_REGEX.exec(fullTag))) {
                    this.onAttribute && this.onAttribute(attribMatch[1], attribMatch[2], match.index + attribMatch.index + 1, match.index + attribMatch.index + attribMatch[0].length + 1);
                }

                if (fullTag.endsWith('/')) {
                    const slashIndex = match[0].indexOf('/') + match.index;
                    this.onCloseTag && this.onCloseTag(nameMatch[1], slashIndex, match[0].length + match.index);
                }
            } else if (this.END_TAG_REGEX.test(match[0])) {
                const endTagMatch = this.END_TAG_REGEX.exec(match[0]);
                this.onCloseTag && this.onCloseTag(endTagMatch[1], match.index, match.index + endTagMatch[0].length);
            } else {
                const text = match[0];
                this.onText && this.onText(text, match.index, match.index + text.length);
            }
        }
    }
}
