$('form[name="listform"]').contents().filter(function() {
	return this.nodeType == 3 && $.trim(this.nodeValue).length;
})
	.wrap('<span class="q-formtext" />'),
	$('input[name="lowerage"], input[name="lowerage"] + .q-formtext').wrapAll('<span class="q-range-1" />'),
	$('input[name="upperage"], input[name="upperage"] + .q-formtext').wrapAll('<span class="q-range-2" />'),
	$('a[href^="javascript:selectgeo"], a[href^="javascript:reset"]').wrapAll('<span class="q-geo" />'),
	$('.select-style.inline.floatleft.margin-right, [class^="q-range-"], .q-geo').wrapAll('<fieldset class="q-field-set" />');
