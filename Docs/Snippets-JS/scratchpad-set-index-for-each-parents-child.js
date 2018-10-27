var parents = $('.list, .gallery, #largeicons, .icons, .scribbleboard-holder');
var children = $('.odd, .even, li');
var ClassName = 'q-flex--item-';

// For each `wrapper`
parents.each(function() {
	// Get all the `items` inside this `wrapper`
	$(this).find(children).each(function () {
		//var classIndex = ($(this).index()) > 9 ? $(this).index() : 0 + $(this).index();
		//$(this).addClass(ClassName + (classIndex + 1));
		$(this).addClass( ClassName + ($(this).index() + 1) );
		// Add class using the `index()` of this element
	});
});
