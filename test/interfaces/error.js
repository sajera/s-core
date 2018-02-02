
/**
 * to be tested
 */
var ErrorInterface = require('../../lib/interfaces/error');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ErrorInterface', function () {

    it('class "ErrorInterface" should exist', function () {
        expect(ErrorInterface).to.be.a('function');
    });

    it('should has @abstract @static method "create"', function () {
        expect(ErrorInterface.create,  "create").to.be.a('function').and.to.throw();
    });

    var msg = 'Custom error message';
    var err = new Error('Origin error message');
    var instance = new ErrorInterface(msg, err);

    it('"instance" should has property "message"', function () {
        expect(instance.message,  "message").to.be.a('string').and.to.include(msg);
    });

    it('"instance" should has @abstract method "toJSON"', function () {
        expect(instance.toJSON,  "toJSON").to.be.a('function').and.to.throw();
    });

    it('"instance" should has @abstract method "toString"', function () {
        expect(instance.toString,  "toString").to.be.a('function').and.to.throw();
    });

});
