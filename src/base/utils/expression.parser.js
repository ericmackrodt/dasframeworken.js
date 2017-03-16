// OLD = /([&|]{2})|([\(\)])|([!]+)?([\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\)]+)?/g;

const EQUALITY_REGEX = /^\s*([!\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\\=)]+)?\s*$/;
const EXPRESSION_REGEX = /([&|]{2})|([\(\)])|([!\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\)]+)?/g;
const STRING_REGEX = /^['"](.*)['"]$/;
const NOT_REGEX = /^\s*([!]+)\s*(\w+)\s*$/;
const LOGICAL_OPERATORS = ['&&', '||'];
const RELATIONAL_OPERATORS = ['==', '!=', '===', '!==', '!', '>=', '<=', '>', '<'];
const BOOLEANS = ['true', 'false']; 

export class ExpressionParser {
    constructor(expression, controller) {
        this._expression = expression;
        this._controller = controller;
    }

    _getRegexMatchArray(regex, input) {
        let match = regex.exec(input);
        if (!match) return;
        match = match.filter(m => m !== undefined);
        match.shift();
        return match;
    }

    _evaluateNot(nots, value) {
        let evaluate;
        nots.shift();
        if (nots.length) {
            evaluate = this._evaluateNot(nots, value);
        }

        return this._getOperation('!', evaluate || this._getValue(value));
    }

    _getValue(m) {
        let match;
        if ((match = this._getRegexMatchArray(NOT_REGEX, m))) {
            const nots = match[0].split('');
            return this._evaluateNot(nots, match[1]);
        } else if (BOOLEANS.indexOf(m) > -1) {
            return m === 'true';
        } else if (m in this._controller) {
            return this._getPropertyEval(this._controller, m);
        } else if (!isNaN(m)) {
            return parseInt(m);
        } else if ((match = STRING_REGEX.exec(m))) {
            return match[1];
        } else {
            return m;
        }
    }

    _getPropertyEval(obj, prop) {
        return () => obj[prop];
    }

    _asFunction(val) {
        if (typeof val === 'function') {
            return val();
        } else {
            return val;
        }
    }

    _getOperation(operation, left, right) {
        switch (operation) {
            case '==':
                return () => this._asFunction(left) == this._asFunction(right);
            case '!=':
                return () => this._asFunction(left) != this._asFunction(right);
            case '===':
                return () => this._asFunction(left) === this._asFunction(right);
            case '!==':
                return () => this._asFunction(left) !== this._asFunction(right);
            case '<=':
            case '=<':
                return () => this._asFunction(left) <= this._asFunction(right);
            case '>=':
            case '=<':
                return () => this._asFunction(left) >= this._asFunction(right);
            case '<':
                return () => this._asFunction(left) < this._asFunction(right);
            case '>':
                return () => this._asFunction(left) > this._asFunction(right);
            case '!':
                return () => !this._asFunction(left);
            case '&&':
                return () => this._asFunction(left) && this._asFunction(right);
            case '||':
                return () => this._asFunction(left) || this._asFunction(right);
        }
    }

    _processExpression(expression) {
        let match;
        if (!(expression instanceof Array)) {
            expression = [expression];
        }
        if (expression.length === 1 && (match = this._getRegexMatchArray(EQUALITY_REGEX, expression[0]))) {
            const left = this._getValue(match[0]);
            const right = this._getValue(match[2]);
            const operation = match[1];
            if (typeof left === 'function' && !right && !operation) {
                expression[0] = left;
            } else {
                expression[0] = this._getOperation(match[1], left, right);
            }
        }

        while (expression.length > 1 || typeof expression[0] !== 'function') {
            let index = -1;
            let leftIndex = 0;
            let rightIndex = 0;
            let left;
            let right;
            if ((index = expression.indexOf('&&')) > -1) {
                leftIndex = index - 1;
                rightIndex = index + 1;
                left = this._processExpression(expression[leftIndex]);
                right = this._processExpression(expression[rightIndex]);
                expression[leftIndex] = this._getOperation('&&', left, right);
                expression.splice(index, 2);

                continue;
            } else if ((index = expression.indexOf('||')) > -1) {
                leftIndex = index - 1;
                rightIndex = index + 1;
                left = this._processExpression(expression[leftIndex]);
                right = this._processExpression(expression[rightIndex]);
                expression[leftIndex] = this._getOperation('||', left, right);
                expression.splice(index, 2);

                continue;
            }

            break;
        }

        return expression[0];
    }

    _buildEvaluator() {
        const expression = this._expression.match(EXPRESSION_REGEX);
        EXPRESSION_REGEX.lastIndex = 0;
        return this._processExpression(expression);
    }

    evaluate() {
        if (!this._evaluator) {
            this._evaluator = this._buildEvaluator();
        }

        return this._evaluator();
    }
}