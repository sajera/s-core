
/**
 * to be tested
 */
var ModuleBase = require('../../lib/modules/modulebase');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ModuleBase', function () {

    it('class "ModuleBase" should exist', function () {
        expect(ModuleBase).to.be.a('function');
    });

    it('"instance" should has @abstract method "initialize"', function () {
        var instance = new ModuleBase();
        expect(instance.initialize).to.be.a('function').and.to.throw();
    });

    it('class "ModuleBase" should has @static method "create"', function () {
        expect(ModuleBase.create).to.be.a('function');
        // prevent unhandled rejection message
        let promise = ModuleBase.create().catch(err=>'do nothing');
        expect(promise).to.be.a('promise');
    });

});
