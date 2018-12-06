var haveStylus = $('style.stylus[type="text/css"]');
var haveMagiCss = $('style[id^="MagiCSS-"][data-style-created-by="magicss"]');
var havexStyle = $('style[id^="xstyle-"].xstyle')
if ( haveStylus.length ) {
	console.log("Stylus is active");
} else {
	console.log("Stylus is not active");
}
