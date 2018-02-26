
/**
 * to be tested
 */
let Singleton = require('../../lib/modules/singleton');

/**
 * chai
 */
let expect = require('chai').expect;

/**
 * Interface Error
 */
describe('Singleton', function () {

    it('class "Singleton" should exist', function () {
        expect(Singleton).to.be.a('function');
    });

    it('"instance" should has @abstract method "initialize"', function () {
        let instance = new Singleton();
        expect(instance.initialize).to.be.a('function').and.to.throw();
    });

    it('class "Singleton" should has @static method "create"', function () {
        expect(Singleton.create).to.be.a('function');
        // prevent unhandled rejection message
        let promise = Singleton.create().catch(() => 'do nothing' );
        expect(promise).to.be.a('promise');
    });

});
