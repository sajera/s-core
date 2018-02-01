
"use strict";

/**
 *
 */
var ErrorInterface = require('../../lib/interfaces/error.js');

/**
 *
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ErrorInterface', function () {

    it('class "ErrorInterface" should exist', function () {
        expect(ErrorInterface).to.be.a('function');
    });

    it('has static methods', function () {
        expect(ErrorInterface.create,  "create").to.be.a('function');
    });

    var msg = 'Custom error message';
    var err = new Error('Origin error message');
    var instance = new ErrorInterface(msg, err);

    it('"instance" should has props', function () {
        expect(instance.uid,  "uid").to.be.a('string');
        expect(instance.date,  "date").to.be.a('date');
        expect(instance.message,  "message").to.be.a('string').and.to.include(msg);
    });

    it('"instance" should has methods', function () {
        expect(instance.toJSON,  "toJSON").to.be.a('function');
        expect(instance.toString,  "toString").to.be.a('function');
    });

});
