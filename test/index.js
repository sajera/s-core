
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

    it('has static classes', function () {
        expect(Core.ErrorBase, "ErrorBase").to.be.a('function');
        expect(Core.ErrorSpec, "ErrorSpec").to.be.a('function');
        expect(Core.ModuleBase, "ModuleBase").to.be.a('function');
        expect(Core.Bootstrap, "ModuleBase").to.be.a('function');
        // TODO connect others

    });

    it('has static methods', function () {
        expect(Core.create, "create").to.be.a('function');
        // TODO connect others

    });

    it('has static props', function () {
        expect(Core.logger, "logger").to.be.a('object');
        expect(Core.config, "config").to.be.a('object');
        expect(Core.utils, "utils").to.be.a('object');
        // TODO connect others

    });


});
