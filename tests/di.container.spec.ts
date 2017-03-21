import { ITypeMetadata } from './../src/base/types/interfaces';
import * as chai from 'chai';
const expect = chai.expect;

import DIContainer from './../src/base/di.container';

class TestType1 {

}

class TestType2 {

}

class SingleDependencyType {
    public static dependencies: any[] = [TestType1];

    constructor(public test: TestType1) {}
}

class MultiDependencyType {
    public static dependencies: any[] = [TestType1, TestType2];

    constructor(public test1: TestType1, public test2: TestType2) {}
}

class SingleMetadataType {
    public static metadata = { dependencies: [TestType1] }

    constructor(public test: TestType1) {}
}

class MultiMetadataType {
    public static metadata = { dependencies: [TestType1, TestType2] }

    constructor(public test1: TestType1, public test2: TestType2) {}
}

describe('di.container', () => {
    let sut: DIContainer;

    beforeEach(() => {
        sut = new DIContainer();
    });

    describe('registerType', () => {
        it('should register type', () => {
            sut.registerType(TestType1);
            expect(Object.keys(sut.typeRegistry)).to.contain('TestType1');
            expect(sut.typeRegistry['TestType1']).to.have.property('type');
            expect(sut.typeRegistry['TestType1']).to.have.property('instance');
            expect(sut.typeRegistry['TestType1'].type).to.be.equal(TestType1);
        });

        it('should register multiple types', () => {
            sut.registerType(TestType1);
            sut.registerType(TestType2);
            expect(Object.keys(sut.typeRegistry)).to.contain('TestType1');
            expect(Object.keys(sut.typeRegistry)).to.contain('TestType2');
        });
    });

    describe('resolve', () => {
        beforeEach(() => {
            sut.registerType(TestType1);
        });

        it('should get instance of TestType', () => {
            const instance = sut.resolve(TestType1);
            expect(instance).to.be.instanceof(TestType1);
        });

        it('should resolve the dependency of a type via dependencies property', () => {
            const instance = sut.resolve(SingleDependencyType);
            expect(instance.test).to.be.instanceof(TestType1);
        })

        it('should resolve dependency of a type via metadata property', () => {
            const instance = sut.resolve(SingleMetadataType);
            expect(instance.test).to.be.instanceof(TestType1);
        });

        it('should resolve multiple dependencies of a type via dependencies property', () => {
            sut.registerType(TestType2);
            const instance = sut.resolve(MultiDependencyType);
            expect(instance.test1).to.be.instanceof(TestType1);
            expect(instance.test2).to.be.instanceof(TestType2);
        })

        it('should resolve multiple dependencies of a type via metadata property', () => {
            sut.registerType(TestType2);
            const instance = sut.resolve(MultiMetadataType);
            expect(instance.test1).to.be.instanceof(TestType1);
            expect(instance.test2).to.be.instanceof(TestType2);
        });

        it('should fail to resolve a dependency that is not registered', () => {
            expect(sut.resolve(MultiDependencyType)).to.throw('Error: Type (TestType2) not registered');
        });
    });

    describe('getInstance', () => {
        beforeEach(() => {
            sut.registerType(TestType1);
        });

        it('should be able to get instance by type', () => {
            throw 'fail';
        });

        it('should be able to get instance by string', () => {
            throw 'fail';
        });

        it('should be able to resolve the dependency of a type via dependencies property', () => {
            throw 'fail';
        });

        it('should be able to resolve the dependency of a type via metadata property', () => {
            throw 'fail';
        });

        it('should be able to resolve multiple dependencies of a type via dependencies property', () => {
            throw 'fail';
        });

        it('should be able to resolve multiple dependencies of a type via metadata property', () => {
            throw 'fail';
        });

        it('should throw error if type is not registered', () => {
            throw 'fail';
        });

        it('should fail to resolve a dependency that is not registered', () => {
            throw 'fail';
        });
    });
});