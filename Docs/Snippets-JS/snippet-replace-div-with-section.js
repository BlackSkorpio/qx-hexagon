// NOTE Replace <div> with <section> https://stackoverflow.com/a/11707394/6820262
$(".homepage > div.homepageblock").replaceWith(function() {
	return "<section class='homepageblock'>" + this.innerHTML + "</section>";
});
