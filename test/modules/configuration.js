
/**
 * to be tested
 */
const Configuration = require('../../lib/modules/configuration');

/**
 * chai
 */
const fs = require('fs');
const expect = require('chai').expect;

/**
 * TESTS
 */
describe('Configuration', function () {

    it('shuld exist', function () {
        expect(Configuration).to.be.a('function');
    });

    it('has static methods', function () {
        expect(Configuration.create).to.be.a('function');
        expect(Configuration.pathENV).to.be.a('function');
        expect(Configuration.parseENV).to.be.a('function');
    });

    // initialize configuration instance
    Configuration.create();

    it('has static props', function () {
        expect(Configuration.dirName).to.be.a('string');
        expect(Configuration.envName).to.be.a('string');
        expect(Configuration.instance).to.be.a('object');
    });

    it('"instance" instanceof "Configuration"', function () {
        expect(Configuration.instance instanceof Configuration).to.be.true;
    });

    it('Configuration static parseENV', function () {
        expect(Configuration.parseENV).to.be.a('function');
        // read
        let source = fs.readFileSync('./test/modules/test.env', 'utf8', 'r');
        // parse
        let env = Configuration.parseENV(source);
        expect(env, 'parse env file "test.env"').to.eql({
            config_e: 'ENV',
            DB_USER: 'root',
            DB_PASS: 's1mpl3',
            DB_HOST: 'localhost',
        });
    });

    it('"instance" should has methods', function () {
        expect(Configuration.instance.initialize).to.be.a('function');
        expect(Configuration.instance.environment).to.be.a('function');
    });

});
