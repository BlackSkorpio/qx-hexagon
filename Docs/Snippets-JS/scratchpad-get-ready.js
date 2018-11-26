// https://dev.opera.com/articles/css-will-change-property/
// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName

var GetReady = document.getElementsByClassName('.list > .odd, .list > .even, .gallery > .odd, .gallery > .even');

function readyGet() {
	GetReady.addEventListener('mouseenter', hintBrowser);
	GetReady.addEventListener('animationEnd', removeHint);
}

function hintBrowser() {
	this.style.willChange = 'transform, box-shadow';
}

function removeHint() {
	this.style.willChange = 'auto';
}
