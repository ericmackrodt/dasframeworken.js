const MagicString = require('magic-string').default;

export default class CodeBuilder {
    private _contents: { [region: string]: string[][] };
    private _indent: number;

    constructor(_html: string, _fileName: string) {
        this._contents = {};
        this._indent = 0;
    }

    private getIndent() {
        return '    ';
    }

    private getRegion(region: string) {
        let selectedRegion = this._contents[region || 'default'];
        if (!selectedRegion) {
            selectedRegion = this._contents[region || 'default'] = [];
        }
        return selectedRegion;
    }

    public appendLine(content: string, region?: string) {
        const selectedRegion = this.getRegion(region);

        const line: string[] = [];

        for (let i = 0; i < this._indent; i++) {
            line.push(this.getIndent());
        }

        line.push(content);

        selectedRegion.push(line);
        return this;
    }

    public indentAll(region?: string): CodeBuilder {
        const selectedRegion = this.getRegion(region);
        selectedRegion.forEach(o => o.unshift(this.getIndent()));
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

    public prepend(value: string, region?: string) {
        const selectedRegion = this.getRegion(region);
        if (selectedRegion.length === 0) {
            this.appendLine(value, region);
            return;
        }
        selectedRegion[0].unshift(value);
        return this;
    }

    public append(value: string, region?: string) {
        const selectedRegion = this.getRegion(region);
        if (selectedRegion.length === 0) {
            this.appendLine(value, region);
            return;
        }
        selectedRegion[selectedRegion.length - 1].push(value);
        return this;
    }

    public generate(...order: string[]) {
        const regions = order || Object.keys(this._contents);
        return regions.map(region => this._contents[region].map(o => o.join('')).join('\n')).join('\n');
    }
}