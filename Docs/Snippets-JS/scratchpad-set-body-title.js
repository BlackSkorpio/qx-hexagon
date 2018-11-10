var url = window.location.href;
if ( ~url.indexOf('/members/' || 'clubs' || '/pics/' || '/movies/' || '/texts/' || '/forum/' || '/chat/' || '/info/' ) ) {
	var titleSRC = '#current_page';
}
else if ( ~url.indexOf('/?id=') ) {
	var titleSRC = '.column-content h2:first-of-type > a';
}
else {
	var titleSRC = '.column-content h2:first-of-type';
}

var mainTitle = document.querySelector( titleSRC ).innerHTML;
document.title = "Qruiser - " + mainTitle;

// Qruiser.com - The Nordic Gay & Queer Online Community
/*var bodyURL	= window.location.href.indexOf("/?id=");
if ( bodyURL > -1) {
	var titleSRC = '.column-content h2:first-of-type > a';
} else {
	var titleSRC = '.column-content h2:first-of-type';
}
var mainTitle = document.querySelector( titleSRC ).innerHTML;*/

//if ( bodyURL > -1) {
//if ( titleSRC || titleSRC2 ) {
//	document.title = "Qruiser - " + mainTitle;
//}
//	document.title = "Qruiser - " + mainTitle;
//};
