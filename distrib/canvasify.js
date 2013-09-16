/*! canvasify v0.1.0 - 2013-09-16 
 *  License:  */
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
/**
 *
 */
(function (window, undefined) {
    var canvasifies = [];
    var Canvasify = Base.extend(function (image, auto) {
        var _auto = auto || true;
        this.setProperty('image', image);
        this.setProperty('width', image.width);
        this.setProperty('height', image.height);
        this.setProperty('canvas', document.createElement('canvas'));
        this.onChange('width', this.convert);
        if (_auto) {
            this.convert();
        }
        return this;
    });
    Canvasify.prototype.convert = function () {
        var me = this,
            image = me.getProperty('image'),
            canvas = me.getProperty('canvas'),
            parent = image.parentNode,
            width = this.getProperty('width'),
            height = this.getProperty('height'),
            url = image.src,
            ctx;
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        image.src = '';
        image.onload = function () {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#333';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            parent.replaceChild(canvas, image);
        };
        image.src = url;

    };

    /**
     *
     * @param selector image class
     */
    function canvasifyImages(selector) {
        var _selector = selector || false,
            _images,
            _len;
        if (_selector) {
            _images = document.getElementsByClassName(selector);
        } else {
            _images = document.getElementsByTagName('img');
        }
        _len = _images.length - 1;
        while (_len >= 0) {
            canvasifies.push(new Canvasify(_images[_len]));
            _len--;
        }
    }

    window.canvas = window.canvas || {};
    window.canvas.Canvasify = Canvasify;
    window.canvas.canvasifyImages = canvasifyImages;
}(window));