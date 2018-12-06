var isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
if ( isSafari ) {
	console.log("Safari, yeah!");
} else {
	console.log("Not Safari");
}
