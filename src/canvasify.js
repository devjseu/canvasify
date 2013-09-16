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