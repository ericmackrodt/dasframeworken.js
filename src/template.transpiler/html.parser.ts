export default class {
    private readonly HTML_REGEX = /<([^<]+)>|([^<>]+)/gi;
    private readonly TAG_REGEX = /([\w-]+)/;
    private readonly END_TAG_REGEX = /<\/\s*([\w-]+)\s*>/;

    public onOpenTag: (name: string, startIndex: number, endIndex: number) => void;
    public onAttribute: (key: string, value: string, startIndex: number, endIndex: number) => void;
    public onCloseTag: (name: string, startIndex: number, endIndex: number) => void;
    public onText: (name: string, startIndex: number, endIndex: number) => void;

    constructor(private _html: string) {
        
    }

    execute() {
        let match;
        while ((match = this.HTML_REGEX.exec(this._html))) {

            if (match[0].startsWith('<') && !match[1].startsWith('/')) {
                const fullTag = match[1].trim();
                const nameMatch = fullTag.match(this.TAG_REGEX);
                const ATTRIBUTE_REGEX = /([\w-:@]+[^=])=["]([^"]+)["]|[']([^"]+)[']/gi;

                this.onOpenTag && this.onOpenTag(nameMatch[0], match.index, match.index + nameMatch[0].length);

                let attribMatch;
                while((attribMatch = ATTRIBUTE_REGEX.exec(fullTag))) {
                    // console.log(attribMatch);
                    this.onAttribute && this.onAttribute(attribMatch[1], attribMatch[2], match.index + attribMatch.index, match.index + attribMatch.index + attribMatch[0].length);
                }

                if (fullTag.endsWith('/')) {
                    const slashIndex = fullTag.indexOf('/') + match.index;
                    this.onCloseTag && this.onCloseTag(nameMatch[0], slashIndex, match[0].length + match.index);
                }
            } else if (this.END_TAG_REGEX.test(match[0])) {
                const endTagMatch = this.END_TAG_REGEX.exec(match[0]);
                this.onCloseTag && this.onCloseTag(endTagMatch[1], match.index, match.index + endTagMatch[0].length);
            } else {
                const text = match[0].trim();//.replace('\n', '').replace('\r', '');
                this.onText && this.onText(text, match.index, match.index + match[0].length);
            }
        }
    }
}
