import { ExpressionParser } from './../../../src/base/utils/expression.parser';
import * as chai from 'chai';

const should = chai.should();

describe('ExpressionParser', () => {

    function execute(tests) {
        tests.forEach((t, i) => {
            it(`should be [${t.expect}] when [${t.expression}]. (index: ${i})`, () => {
                const sut = new ExpressionParser(t.expression, t.obj);
                const result = sut.evaluate();
                result.should.be.equal(t.expect);
            });
        });
    }

    execute([
        { expression: 'filter === true && !obs', obj: { filter: true, obs: false }, expect: true },
        { expression: 'filter === true && !obs', obj: { filter: true, obs: true }, expect: true },
        { expression: "filter === 1", obj: { filter: 1 }, expect: true },
        { expression: 'filter === true', obj: { filter: true, obs: false }, expect: true },
    ]);
});

