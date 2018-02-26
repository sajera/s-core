
/**
 * to be tested
 */
let ErrorInterface = require('../../lib/interfaces/error');

/**
 * chai
 */
let expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ErrorInterface', function () {

    it('class "ErrorInterface" should exist', function () {
        expect(ErrorInterface).to.be.a('function');
    });

    it('should has @abstract @static method "create"', function () {
        expect(ErrorInterface.create).to.be.a('function').and.to.throw();
    });

    let msg = 'Custom error message';
    let err = new Error('Origin error message');
    let instance = new ErrorInterface(msg, err);

    it('"instance" should has property "message"', function () {
        expect(instance.message).to.be.a('string').and.to.include(msg);
    });

    it('"instance" should has @abstract method "toJSON"', function () {
        expect(instance.toJSON).to.be.a('function').and.to.throw();
    });

    it('"instance" should has @abstract method "toString"', function () {
        expect(instance.toString).to.be.a('function').and.to.throw();
    });

});
