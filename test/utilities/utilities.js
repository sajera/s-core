
'use strict';

/**
 * to be tested
 */
var utils = require('../../lib/utilities/utilities');

/**
 * chai
 */
var expect = require('chai').expect;

// test arguments
var args = { a: 1, r: 2, g: 3};
// promise flow success
function actionResolve ( a, r, g ) {
    // console.log('arguments',a,r,g);
    return new Promise( (resolve, reject) => resolve({a,r,g}) );
}
// promise flow error
function actionReject ( a, r, g ) {
    // console.log('arguments',a,r,g);
    return new Promise( (resolve, reject) => reject({a,r,g}) );
}
// async flow success
function actionResult ( a, r, g, cb ) {
    // console.log('arguments',a,r,g);
    cb(null, {a,r,g});
}
// async flow error
function actionError ( a, r, g, cb ) {
    // console.log('arguments',a,r,g);
    cb({a,r,g}, null);
}

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

    it('should has handle', function () {
         expect(utils.handleAsAsync).to.be.a('function');
         expect(utils.handleAsPromise).to.be.a('function');
    });

    it('test handleAsAsync result', function () {
        utils.handleAsAsync(actionResolve, args['a'], args['r'], args['g'], function ( error, result ) {
            if (error) expect.fail('result', 'error', 'Should result but error present');
            else expect(result).to.be.a('object').and.eql(args);
        });
        utils.handleAsAsync(actionResult, args['a'], args['r'], args['g'], function ( error, result ) {
            if (error) expect.fail('result', 'error', 'Should result but error present');
            else expect(result).to.be.a('object').and.eql(args);
        })
    });

    it('test handleAsAsync error', function () {
        utils.handleAsAsync(actionReject, args['a'], args['r'], args['g'], function ( error, result ) {
            if (error) expect(error).to.be.a('object').and.eql(args);
            else expect.fail('error', 'result', 'Should error but result present');
        })
        utils.handleAsAsync(actionError, args['a'], args['r'], args['g'], function ( error, result ) {
            if (error) expect(error).to.be.a('object').and.eql(args);
            else expect.fail('error', 'result', 'Should error but result present');
        })
    });

    it('test handleAsPromise resolve', function () {
        utils.handleAsPromise(actionResolve, args['a'], args['r'], args['g'])
            .then(function ( success ) {
                expect(success).to.be.a('object').and.eql(args);
            })
            .catch(function ( error ) {
                expect.fail('resolve', 'reject', 'Should resolve but it rejected');
            });
        utils.handleAsPromise(actionResult, args['a'], args['r'], args['g'])
            .then(function ( success ) {
                expect(success).to.be.a('object').and.eql(args);
            })
            .catch(function ( error ) {
                expect.fail('resolve', 'reject', 'Should resolve but it rejected');
            });
    });

    it('test handleAsPromise reject', function () {
        utils.handleAsPromise(actionReject, args['a'], args['r'], args['g'])
            .then(function ( success ) {
                expect.fail('reject', 'resolve', 'Should reject but it resolved');
            })
            .catch(function ( error ) {
                expect(error).to.be.a('object').and.eql(args);
            });
        utils.handleAsPromise(actionError, args['a'], args['r'], args['g'])
            .then(function ( success ) {
                expect.fail('reject', 'resolve', 'Should reject but it resolved');
            })
            .catch(function ( error ) {
                expect(error).to.be.a('object').and.eql(args);
            });
    });

});
