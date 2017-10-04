const MagicString = require('magic-string').default;

export default class CodeBuilder {
    private _contents: string[][];
    private _indent: number;

    constructor(_html: string, _fileName: string) {
        this._contents = [];
        this._indent = 0;
    }

    private getIndent() {
        return '    ';
    }

    public appendLine(content: string) {
        const line: string[] = [];

        for (let i = 0; i < this._indent; i++) {
            line.push(this.getIndent());
        }

        line.push(content);

        this._contents.push(line);
        return this;
    }

    public indentAll() {
        this._contents.forEach(o => o.unshift(this.getIndent()));
        return this;
    }

    public indent() {
        this._indent++;
        return this;
    }

    public deindent() {
        this._indent--;
        return this;
    }

    public prepend(value: string) {
        if (this._contents.length === 0) {
            this.appendLine(value);
            return;
        }
        this._contents[0].unshift(value);
        return this;
    }

    public append(value: string) {
        if (this._contents.length === 0) {
            this.appendLine(value);
            return;
        }
        this._contents[this._contents.length - 1].push(value);
        return this;
    }

    public generate() {
        return this._contents.map(o => o.join('')).join('\n');
    }
}