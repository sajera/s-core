
"use strict";

/**
 * to be tested
 */
var Configuration = require('../../lib/utilities/configuration');

/**
 * chai
 */
const fs = require('fs');
var expect = require('chai').expect;

/**
 * TESTS
 */
describe('Configuration', function () {

    it('shuld exist', function () {
        expect(Configuration).to.be.a('function');
    });

    it('has static methods', function () {
        expect(Configuration.create,  "create").to.be.a('function');
        expect(Configuration.pathENV,  "pathENV").to.be.a('function');
        expect(Configuration.parseENV,  "parseENV").to.be.a('function');
    });

    // initialize configuration instance
    Configuration.create();

    it('has static props', function () {
        expect(Configuration.dirName,  "dirName").to.be.a('string');
        expect(Configuration.envName,  "envName").to.be.a('string');
        expect(Configuration.instance,  "instance").to.be.a('object');
    });

    it('"instance" instanceof "Configuration"', function () {
        expect(Configuration.instance instanceof Configuration).to.be.true;
    });

    it('Configuration static parseENV', function () {
        expect(Configuration.parseENV).to.be.a('function');
        // read
        var source = fs.readFileSync(__dirname+'/test.env', 'utf8', 'r');
        // parse
        var env = Configuration.parseENV(source);
        expect(env, 'parse env file "test.env"').to.eql({
            config_e: 'ENV',
            DB_USER: 'root',
            DB_PASS: 's1mpl3',
            DB_HOST: 'localhost',
        });
    });

    it('"instance" should has methods', function () {
        expect(Configuration.instance.initialize, '"initialize" !!!').to.be.a('function');
        expect(Configuration.instance.environment, '"environment" !!!').to.be.a('function');
    });

});
