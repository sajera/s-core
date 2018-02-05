
'use strict';

/**
 * to be tested
 */
var utils = require('../../lib/utilities/utilities');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * DEV Node.js modules "mocha" was running tests
 */
 describe('UTILITIES:', function () {

     require('./logger.js');
     require('./configuration.js');

     it('class "utils" should exist', function () {
         expect(utils).to.be.a('object');
     });

     it('provide is', function () {
         expect(utils.is).to.be.a('function');
     });

     it('provide uid', function () {
         expect(utils.uid).to.be.a('function');
     });

     it('should has logger', function () {
         expect(utils.logger).to.be.a('object');
         expect(utils.Logger).to.be.a('function');
         expect(utils.setupLogger).to.be.a('function');
         expect(utils.logger instanceof utils.Logger).to.be.true;
     });

     it('should has config', function () {
         expect(utils.config).to.be.a('object');
         expect(utils.Configuration).to.be.a('function');
         expect(utils.setupConfiguration).to.be.a('function');
         expect(utils.config instanceof utils.Configuration).to.be.true;
     });

 });
