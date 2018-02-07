
'use strict';

/**
 * to be tested
 */
var Core = require('../index.js');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * library TESTS
 */
describe('MVC Core', function () {

    it('TEST TESTS', function () {
        // expect(Core).to.be.a('class');

    });

    require('./utilities/utilities.js');
    require('./interfaces/index.js');
    require('./modules/index.js');
    require('./errors/index.js');


    it('should exist', function () {
        expect(Core).to.be.a('function');
    });

    it('should has @static class "Logger"', function () {
        expect(Core.Logger).to.be.a('function');
    });

    it('should has @static class "Configuration"', function () {
        expect(Core.Configuration).to.be.a('function');
    });

    it('should has @static class "ModuleBase"', function () {
        expect(Core.ModuleBase).to.be.a('function');
    });

    it('should has @static class "Bootstrap"', function () {
        expect(Core.Bootstrap).to.be.a('function');
    });

    it('should has @static class "ErrorBase"', function () {
        expect(Core.ErrorBase).to.be.a('function');
    });

    it('should has @static class "ErrorSpec"', function () {
        expect(Core.ErrorSpec).to.be.a('function');
    });

    it('has @static methods', function () {
        expect(Core.create).to.be.a('function');
        expect(Core.initialize).to.be.a('function');
        // TODO connect others

    });

    it('has static props', function () {
        expect(Core.logger).to.be.a('object');
        expect(Core.config).to.be.a('object');
        expect(Core.utils).to.be.a('object');
        // TODO connect others

    });

});
