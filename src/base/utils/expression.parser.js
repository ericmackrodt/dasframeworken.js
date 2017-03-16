export class ExpressionBuilder {

    get expression() {
        return this._expression;
    }

    constructor() {
        this._expression = [];
    }

    static _getPropertyEval(obj, prop) {
        return () => obj[prop];
    }

    static _asFunction(val) {
        if (typeof val === 'function') {
            return val();
        } else {
            return val;
        }
    }

    static _getOperation(operation, left, right) {
        switch (operation) {
            case '==':
                return () => ExpressionBuilder._asFunction(left) == ExpressionBuilder._asFunction(right);
            case '!=':
                return () => ExpressionBuilder._asFunction(left) != ExpressionBuilder._asFunction(right);
            case '===':
                return () => ExpressionBuilder._asFunction(left) === ExpressionBuilder._asFunction(right);
            case '!==':
                return () => ExpressionBuilder._asFunction(left) !== ExpressionBuilder._asFunction(right);
            case '<=':
            case '=<':
                return () => ExpressionBuilder._asFunction(left) <= ExpressionBuilder._asFunction(right);
            case '>=':
            case '=<':
                return () => ExpressionBuilder._asFunction(left) >= ExpressionBuilder._asFunction(right);
            case '<':
                return () => ExpressionBuilder._asFunction(left) < ExpressionBuilder._asFunction(right);
            case '>':
                return () => ExpressionBuilder._asFunction(left) > ExpressionBuilder._asFunction(right);
            case '!':
                return () => !ExpressionBuilder._asFunction(left);
            case '&&':
                return () => ExpressionBuilder._asFunction(left) && ExpressionBuilder._asFunction(right);
            case '||':
                return () => ExpressionBuilder._asFunction(left) || ExpressionBuilder._asFunction(right);
        }
    }

    equals(left, right) {
        const exp = () => left === right;
        return this;
    }
}

export class ExpressionParser {
    constructor(expression, controller) {
        this._operators = ['==', '!=', '===', '!==', '!', '>=', '<=', '>', '<'];
        this._andOr = ['&&', '||'];
        this._boolean = ['true', 'false'];
        this._regex = /([&|]{2})|([\(\)])|([!]+)?([\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\)]+)?/g;
        this._expression = expression;
        this._controller = controller;
    }

    _parseMatch(match) {
        match = match.filter(m => m !== undefined);
        match.shift();
        return match;
    }

    _getValue(m) {
        let str;
        if  (this._boolean.indexOf(m) > -1) {
            return m === 'true';
        } else if (m in this._controller) {
            return ExpressionBuilder._getPropertyEval(this._controller, m);
        } else if (!isNaN(m)) {
            return parseInt(m);
        } else if ((str = /^['"](.*)['"]$/g.exec(m))) {
            return str[1];
        } else {
            return m;
        }
    }

    _evaluateNot(index, nots, value) {
        let evaluate;
        if (++index < nots.length) {
            evaluate = this._evaluateNot(index, nots, value);
        }

        return ExpressionBuilder._getOperation('!', evaluate || this._getValue(value));
    }

    _processMatch(match) {
        match = this._parseMatch(match);
        let evaluation;
        if (match.length === 3 && this._operators.indexOf(match[1]) > -1) {
            const left = this._getValue(match[0]);
            const right = this._getValue(match[2]);
            evaluation = ExpressionBuilder._getOperation(match[1], left, right);
        }

        if (match.length === 2 && /^[!]+$/g.test(match[0])) {
            const nots = match[0].split('');
            evaluation = this._evaluateNot(0, nots, match[1]);
        }

        if (match.length === 1 && this._andOr.indexOf(match[0]) > -1 && !this._operation) {
            this._operation = match[0];
        }

        if (!this._previous) {
            this._previous = evaluation;
        }

        if (!this._right && !!this._operation) {
            this._right = evaluation;
        }

        if (!!this._operation && !!this._previous && this._right) {
            this._previous = ExpressionBuilder._getOperation(this._operation, this._previous, this._right);
            this._right = null;
            this._operation = null;
        }
    } 

    _buildEvaluator() {
        let match;
        const builder = new ExpressionBuilder();
        const s = this._expression.match(this._regex);
        console.log(s);

        while ((match = this._regex.exec(this._expression))) {
            this._processMatch(match);
        }

        return this._previous();
    }

    evaluate() {
        return this._buildEvaluator();
    }
}