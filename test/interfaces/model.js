
/**
 * to be tested
 */
var ModelInterface = require('../../lib/interfaces/model');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ModelInterface', function () {

    it('class "ModelInterface" should exist', function () {
        expect(ModelInterface).to.be.a('function');
    });

    it('should has @abstract @static methods "create"', function () {
        expect(ModelInterface.create).to.be.a('function').and.to.throw();
    });

    it('should has @abstract @static methods "createList"', function () {
        expect(ModelInterface.createList).to.be.a('function').and.to.throw();
    });

    it('"instance" should has @abstract methods "initialize"', function () {
        var instance = new ModelInterface();
        expect(instance.initialize).to.be.a('function').and.to.throw();
    });

    it('"instance" should has @abstract methods "toJSON"', function () {
        var instance = new ModelInterface();
        expect(instance.toJSON).to.be.a('function').and.to.throw();
    });

    it('"instance" should has @abstract methods "toString"', function () {
        var instance = new ModelInterface();
        expect(instance.toString).to.be.a('function').and.to.throw();
    });

});
