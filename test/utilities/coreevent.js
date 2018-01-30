
"use strict";

/**
 *
 */
var CoreEvent = require('../../lib/utilities/coreEvent');

/**
 *
 */
var expect = require('chai').expect;

/**
 * TESTS
 */
describe('utility CORE_EVENT', function () {

    it('should exist', function () {
        expect(CoreEvent).to.be.a('function');
    });

    it('has static methods', function () {
        expect(CoreEvent.init,  "init").to.be.a('function');
        expect(CoreEvent.replace,  "replace").to.be.a('function');
    });

    it('has static props', function () {
        expect(CoreEvent.instance,  "instance").to.be.a('object');
    });

    it('"instance" instanceof "CoreEvent"', function () {
        expect(CoreEvent.instance instanceof CoreEvent).to.be.true;
    });

    it('has method "replace"', function () {
        expect(CoreEvent.replace).to.be.a('function');
    });

    it('method "replace" => test', function () {
        expect(CoreEvent.instance.testsProperties, 'defaults NOT').to.not.be.true;
        class CustomCoreEvent extends CoreEvent {
            constructor () {
                super();
                this.testsProperties = true;
            }
        }
        CoreEvent.replace(CustomCoreEvent);
        expect(CoreEvent.instance.testsProperties, 'custom YES').to.be.true;
        expect(CoreEvent.instance instanceof CoreEvent, 'should stay instanceof "CoreEvent"').to.be.true;
    });

    it('"instance" should has methods', function () {
        expect(CoreEvent.instance.on, '"on" !!!').to.be.a('function');
        expect(CoreEvent.instance.emit, '"emit" !!!').to.be.a('function');
    });

});
