
"use strict";


/**
 *
 */
var Core = require('../index.js');

/**
 *
 */
var expect = require('chai').expect;

/**
 * library TESTS
 */
describe('MVC Core', function () {

    require('./utilities/utilities.js');
    require('./interfaces/interfaces.js');


    it('should exist', function () {
        expect(Core).to.be.a('function');
    });

    it('has static methods', function () {
        expect(Core.on,  "on").to.be.a('function');
        expect(Core.emit,  "emit").to.be.a('function');
        // TODO connect others

    });

    it('has static props', function () {
        expect(Core.instance,  "instance").to.be.a('object');
        expect(Core.EVENT,  "EVENT").to.be.a('object');
        expect(Core.logger,  "logger").to.be.a('object');
        expect(Core.config,  "config").to.be.a('object');
        // TODO connect others

    });

    it('has static Classes', function () {
        // interfaces
        expect(Core.interface.Error,  "interface.Error").to.be.a('function');
        expect(Core.interface.Module,  "interface.Module").to.be.a('function');
        expect(Core.interface.Logger,  "interface.Logger").to.be.a('function');
        expect(Core.interface.Configuration,  "interface.Configuration").to.be.a('function');
        // TODO connect others

    });


});
