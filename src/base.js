/*
 *
 * @author Sebastian Widelak (c) 2013
 */
(function (window, undefined) {
    "use strict";
    function Base() {
        this.properties = {};
        this.propertyEvents = {};
    }


    Base.prototype.setProperty = function (property, value) {
        var oldVal = this.properties[property];
        this.properties[property] = value;
        value !== oldVal &&
            this.propertyEvents[property] &&
            this.propertyEvents[property].onchange &&
        this.propertyEvents[property].onchange.call(this, value, oldVal);
        return this;
    };

    Base.prototype.getProperty = function (property) {
        return this.properties[property];
    };

    Base.prototype.onChange = function (property, callback) {
        this.propertyEvents[property] = this.propertyEvents[property] || {};
        this.propertyEvents[property].onchange = callback;
    };

    Base.prototype.unbindOnChange = function (property) {
        this.propertyEvents[property] = this.propertyEvents[property] || {};
        this.propertyEvents[property].onchange = undefined;
    };

    Base.extend = function (Func) {
        var Extended = this;
        var Class = function () {
            for (var key in Class.prototype) {
                if (typeof Class.prototype[key] === 'object') {
                    this[key] = Class.prototype[key].constructor();
                }
            }
            Func.prototype.constructor.apply(this, arguments);
        };
        Class.prototype = new Extended();
        Class._parent = new Extended();
        Class.extend = Base.extend;
        return Class;
    };

    window.Base = Base;
}(window));