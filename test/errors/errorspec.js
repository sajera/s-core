
/**
 * to be tested
 */
var ErrorSpec = require('../../lib/errors/errorspec');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ErrorSpec', function () {

    var instance, id = 1, spec = {
        status: 500,
        data: {a: 'a'},
        message: 'Test',
    };

    it('class "ErrorSpec" should exist', function () {
        expect(ErrorSpec).to.be.a('function');
    });

    it('should has @static method "create"', function () {
        expect(ErrorSpec.create).to.be.a('function');
    });

    it('should has @static method "define"', function () {
        expect(ErrorSpec.create).to.be.a('function');
    });

    it('test @static method "define"', function () {
        ErrorSpec.define(id, spec);
    });

    it('test @static method "create"', function () {
        instance = ErrorSpec.create(id, new Error());
        expect(instance).to.be.a('error');
    });

    it('"instance" should has property "spec"', function () {
        expect(instance.spec).to.be.a('object').and.eql(spec);
    });

    it('"instance" should has property "message"', function () {
        expect(instance.message).to.be.a('string').and.equal(spec.message);
    });

    it('"instance" should has property "id"', function () {
        expect(instance.id).to.be.a('number').and.equal(id);
    });

    it('"instance" should has method "toJSON"', function () {
        expect(instance.toJSON).to.be.a('function');
        expect(instance.toJSON.bind(instance)).and.not.to.throw();
    });

    it('"instance" should has method "toString"', function () {
        expect(instance.toString).to.be.a('function');
        expect(instance.toString.bind(instance)).not.to.throw();
    });

});
