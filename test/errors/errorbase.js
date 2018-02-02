
/**
 * to be tested
 */
var ErrorBase = require('../../lib/errors/errorbase');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ErrorBase', function () {

    var instance, message = 'Test', level = 1;

    it('class "ErrorBase" should exist', function () {
        expect(ErrorBase).to.be.a('function');
    });

    it('should has @static method "create"', function () {
        expect(ErrorBase.create).to.be.a('function');
    });

    it('test @static method "create"', function () {
        instance = ErrorBase.create(message, new Error(), level);
        expect(instance).to.be.a('error');
    });

    it('"instance" should has property "message"', function () {
        expect(instance.message).to.be.a('string').and.equal(message);
    });

    it('"instance" should has property "level"', function () {
        expect(instance.level).to.be.a('number').and.equal(level);
    });

    it('"instance" should has property "uid"', function () {
        expect(instance.uid).to.be.a('string');
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
