
/**
 * to be tested
 */
let ModuleInterface = require('../../lib/interfaces/module');

/**
 * chai
 */
let expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ModuleInterface', function () {

    it('class "ModuleInterface" should exist', function () {
        expect(ModuleInterface).to.be.a('function');
    });

    it('should has @abstract @static methods "create"', function () {
        expect(ModuleInterface.create).to.be.a('function').and.to.throw();
    });

    let instance = new ModuleInterface();
    it('"instance" should has @abstract methods "initialize"', function () {
        expect(instance.initialize).to.be.a('function').and.to.throw();
    });

});
