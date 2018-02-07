/**
 * @description
    <strong> Base functionality for Modules within the Core. </strong>
    <br/>
    <br/> Basically all modules within the Core inherit logic of singleton pattern.
    <br/> Except cases, when present the functionality for extend or replace of module instance.
    {@link utils.setupLogger} or {@link utils.setupConfiguration}
    <br/> It is also assumed that the module needs to perform asynchronous actions to create and initialize.
    <br/><br/> Abstract class ModuleBase implements Singlton concept. <br/><br/>
 * @example
 * class MyModule extends Core.ModuleBase {
 *      ...
 * }
 * @author Sajera <allsajera@gmail.com>
 * @see {@link ModuleInterface}
 * @classdesc Core.ModuleBase
 * @implements ModuleInterface
 * @param {*} ...arguments - any type and any count of arguments to deleagete it in Module
 * @alias ModuleBase
 * @abstract
 */
