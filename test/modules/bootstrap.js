
/**
 * to be tested
 */
var Bootstrap = require('../../lib/modules/bootstrap');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('Bootstrap', function () {

    it('class "Bootstrap" should exist', function () {
        expect(Bootstrap).to.be.a('function');
    });

    it('class "Bootstrap" should has @static method "create"', function () {
        expect(Bootstrap.create).to.be.a('function');
    });

    var instance = new Bootstrap();
    it('"instance" should has method "initialize"', function () {
        expect(instance.initialize).to.be.a('function');
    });

    it('"instance" should has method "initializeModules"', function () {
        expect(instance.initializeModules).to.be.a('function');
    });

});
