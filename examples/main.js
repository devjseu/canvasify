/**
 *
 */
function onReady() {
    "use strict";
	canvas.canvasifyImages();
}

/**
 * waiting for dom ready
 * @type {number}
 */
var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        onReady();
        clearInterval(readyStateCheckInterval);
    }
}, 10);
